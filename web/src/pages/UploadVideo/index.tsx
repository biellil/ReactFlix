import React, { useState } from 'react'
import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { Progress } from '@chakra-ui/react'
import { Hero } from './styles'

const s3Client = new S3Client({
  endpoint: 'http://147.185.221.19:41985', // URL do MinIO
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'admin123', // Use valores fixos ou obtenha de forma segura no backend
    secretAccessKey: 'admin123', // Use valores fixos ou obtenha de forma segura no backend
  },
  forcePathStyle: true, // Necessário para MinIO
})

export const UploadFileComponent: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<string>('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Nenhum arquivo selecionado')
      return
    }

    const bucketName = 'biel'
    const key = `${selectedFile.name}`

    try {
      const upload = new Upload({
        client: s3Client,
        params: {
          Bucket: bucketName,
          Key: key,
          Body: selectedFile,
        },
      })

      upload.on('httpUploadProgress', (progress) => {
        console.log(progress)
      })

      await upload.done()
      setUploadStatus('Upload bem-sucedido')
      console.log('Upload successful')
    } catch (err) {
      setUploadStatus('Erro ao fazer upload')
      console.error('Error uploading file', err)
    }
  }

  return (
    <Hero className="container">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>
      <Progress hasStripe value={64} />
    </Hero>
  )
}
