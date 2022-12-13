# Omeda

An informational website for Predecessor by [Omeda Studios](https://www.predecessorgame.com/).

Available at [omeda.gg](https://omeda.gg/).

## Features

## Extraction

The site serves its information based on the extraction of the game's data files. Ensure that the game is installed and the data files are available.

## Development

### Install

Clone the repository and run `npm install` to install the required dependencies for building and developing.

### Configuration

Before publishing, you must create a configuration file. You must create a new file called `config.json` with 
the necessary options specified in `config.example.json`.

#### Datamine

The `datamine` configuration options are used when running the extraction program.

**aesKey**

The AES key used to decrypt the game's data files. This is a 32-byte hexadecimal string.

**contentPath**

The path to the game's content directory. This is where the game's data files are located.
This will usually end in `\Content\Paks`.

**binaryPath**

The path to the game's executable. This is used to determine the AES key if it is not provided.

**mappingsPath**

The path to the game's mappings file. This is needed to extract the game's data files. This is a `.usmap` file.

If it is not provided, the extraction program will attempt to generate the mappings file from the game's executable.

Please note that this will launch the game and inject a DLL into the process. This will only work using the **Epic Games
Launcher** version of the game.

**outputPath**

The path to the directory where the extracted data files will be saved.

### Building

### Developing

### Publishing
