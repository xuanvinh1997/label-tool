use std::fs::File;

use std::io::prelude::*;

#[tauri::command]
pub fn create_new_dataset(file_name: std::string::String) -> std::io::Result<()> {
    Ok(())
}
