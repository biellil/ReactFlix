import { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react'
import { listarArquivos } from '../listarArquivos'
import { Div } from './styles'

interface Arquivo {
  Key: string | undefined
}

export const PlayVideo = () => {
  const [arquivos, setArquivos] = useState<Arquivo[]>([])
  const [openedIndex, setOpenedIndex] = useState<number | null>(null)
  const bucketName = 'biel'

  useEffect(() => {
    async function fetchData() {
      const files = await listarArquivos(bucketName)
      setArquivos(files)
    }
    fetchData()
  }, [])

  const handleAccordionChange = (index: number) => {
    setOpenedIndex(openedIndex === index ? null : index)
  }

  return (
    <Div>
      <Accordion allowToggle>
        {arquivos.map((file, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton
                onClick={() => handleAccordionChange(index)}
                className="text"
              >
                <Box as="span" flex="1" textAlign="left">
                  {file.Key || 'Arquivo sem nome'}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} className="play">
              {openedIndex === index && file.Key ? (
                <video width="580" height="480" controls>
                  <source
                    src={`http://147.185.221.19:41985/${bucketName}/${file.Key}`}
                    type="video/mp4"
                  />
                  Seu navegador não suporta a tag de vídeo.
                </video>
              ) : openedIndex === index ? (
                <p>Arquivo sem chave definida</p>
              ) : null}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Div>
  )
}
