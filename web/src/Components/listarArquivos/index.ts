import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3'

const endpoint = 'http://147.185.221.19:41985'

const s3Client = new S3Client({
  endpoint,
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'admin123',
    secretAccessKey: 'admin123',
  },
  forcePathStyle: true,
})

interface Arquivo {
  Key: string | undefined
}

export async function listarArquivos(bucketName: string): Promise<Arquivo[]> {
  try {
    const command = new ListObjectsCommand({ Bucket: bucketName })
    const response = await s3Client.send(command)
    const arquivos: Arquivo[] = (response.Contents || []).map((item) => ({
      Key: item.Key,
    }))

    return arquivos
  } catch (err) {
    console.error('Erro ao listar arquivos', err)
    return []
  }
}

export { endpoint, s3Client }
