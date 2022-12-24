use serde::{de::Visitor, Deserialize, Deserializer, Serialize, Serializer};
use std::{fmt, num::NonZeroI32};

use super::model::FileExtension;

impl FileExtension {
    pub fn from_str(&self) -> &str {
        match self {
            FileExtension::Jpg => "jpg",
            FileExtension::Png => "png",
            FileExtension::Gif => "gif",
        }
    }
}

impl fmt::Display for FileExtension {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.from_str())
    }
}

impl<'de> Deserialize<'de> for FileExtension {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        struct FileExtensionVisitor;

        impl<'de> Visitor<'de> for FileExtensionVisitor {
            type Value = FileExtension;

            fn expecting(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
                fmt.write_str("file extension")
            }

            fn visit_str<E>(self, val: &str) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                match val {
                    "j" => Ok(FileExtension::Jpg),
                    "p" => Ok(FileExtension::Png),
                    "g" => Ok(FileExtension::Gif),
                    _ => Err(E::custom("invalid file extension")),
                }
            }
        }

        deserializer.deserialize_any(FileExtensionVisitor)
    }
}

#[derive(Debug, thiserror::Error)]
pub enum CommandError {
    #[error("reqwest error: {0}")]
    Reqwest(#[from] reqwest::Error),
}

// for serializing errors so they can be sent to the frontend
impl Serialize for CommandError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        match self {
            CommandError::Reqwest(e) => serializer.serialize_str(&e.to_string()),
        }
    }
}

pub type CommandResult<T, E = CommandError> = anyhow::Result<T, E>;

#[derive(Clone, Copy, Debug, Serialize)]
#[serde(transparent)]
pub struct I32OrString(NonZeroI32);

impl<'de> Deserialize<'de> for I32OrString {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        struct I32OrStringVisitor;

        impl<'de> Visitor<'de> for I32OrStringVisitor {
            type Value = I32OrString;

            fn expecting(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
                fmt.write_str("integer or string")
            }

            fn visit_u64<E>(self, val: u64) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                match NonZeroI32::new(val as i32) {
                    Some(val) => Ok(I32OrString(val)),
                    None => Err(E::custom("invalid integer value")),
                }
            }

            fn visit_str<E>(self, val: &str) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                match val.parse::<u64>() {
                    Ok(val) => self.visit_u64(val),
                    Err(_) => Err(E::custom("failed to parse integer")),
                }
            }
        }

        deserializer.deserialize_any(I32OrStringVisitor)
    }
}
