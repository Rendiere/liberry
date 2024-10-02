import { promises as fs } from 'fs'
import path from 'path'
import { parseFile } from 'music-metadata'

interface MusicFile {
  path: string;
  metadata: {
    title?: string;
    artist?: string;
    album?: string;
    year?: number;
    genre?: string[];
    duration?: number;
  };
}

export async function scanDirectory(directoryPath: string): Promise<MusicFile[]> {
  const files = await fs.readdir(directoryPath)
  const musicFiles: MusicFile[] = []

  for (const file of files) {
    const filePath = path.join(directoryPath, file)
    const stats = await fs.stat(filePath)

    if (stats.isDirectory()) {
      musicFiles.push(...await scanDirectory(filePath))
    } else if (stats.isFile() && isMusicFile(file)) {
      const metadata = await extractMetadata(filePath)
      musicFiles.push({ path: filePath, metadata })
    }
  }

  return musicFiles
}

function isMusicFile(filename: string): boolean {
  const musicExtensions = ['.mp3', '.flac', '.wav', '.ogg', '.m4a']
  return musicExtensions.includes(path.extname(filename).toLowerCase())
}

async function extractMetadata(filePath: string): Promise<MusicFile['metadata']> {
  try {
    const metadata = await parseFile(filePath)
    return {
      title: metadata.common.title,
      artist: metadata.common.artist,
      album: metadata.common.album,
      year: metadata.common.year,
      genre: metadata.common.genre,
      duration: metadata.format.duration
    }
  } catch (error) {
    console.error(`Error extracting metadata from ${filePath}:`, error)
    return {}
  }
}