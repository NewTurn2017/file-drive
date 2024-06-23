// src/FileIcons.js
import React from 'react'
import {
  FaFile,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileImage,
  FaFileAudio,
  FaFileVideo,
  FaFileArchive,
  FaFileAlt,
} from 'react-icons/fa'

const iconMapping = {
  image: FaFileImage,
  pdf: FaFilePdf,
  doc: FaFileWord,
  docx: FaFileWord,
  xls: FaFileExcel,
  xlsx: FaFileExcel,
  ppt: FaFilePowerpoint,
  pptx: FaFilePowerpoint,
  txt: FaFileAlt,
  hwp: FaFileAlt,
  csv: FaFileAlt,
  zip: FaFileArchive,
  rar: FaFileArchive,
  mp3: FaFileAudio,
  mp4: FaFileVideo,
  avi: FaFileVideo,
  mov: FaFileVideo,
  wav: FaFileAudio,
  mpg: FaFileVideo,
  m4a: FaFileAudio,
  default: FaFile,
}

const FileIcons = ({ mimeType, size }: { mimeType: string; size: number }) => {
  const IconComponent =
    iconMapping[mimeType as keyof typeof iconMapping] || iconMapping.default
  return <IconComponent size={size} />
}

export default FileIcons
