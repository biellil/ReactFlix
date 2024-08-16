import { FC, useState } from 'react'
import { Modal, Typography, Button, CardMedia, Rating } from '@mui/material'
import { CardStyle, ModalStyle, CardContent, RatingDiv } from './styles'
import { Play } from '@phosphor-icons/react'
import { ModalPlay } from '../modalPlay'

interface ContentPreviewProps {
  open: boolean
  onClose: () => void
  contentId: string | null
  contentType: 'filme' | 'serie'
  title: string
  overview: string
  posterPath: string
  vote_average: number
  release_date: string
  type: string
}

export const ModalPreview: FC<ContentPreviewProps> = ({
  open,
  onClose,
  contentId,
  contentType,
  vote_average,
  title,
  overview,
  posterPath,
  release_date,
  type,
}) => {
  const [modalPlayOpen, setModalPlayOpen] = useState(false)

  const handleOpenModalPlay = () => {
    setModalPlayOpen(true)
  }

  const handleCloseModalPlay = () => {
    setModalPlayOpen(false)
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', options)
  }

  return (
    <Modal open={open} onClose={onClose} aria-labelledby={title}>
      <ModalStyle>
        <CardStyle>
          <CardMedia
            component="img"
            alt={title}
            height="300vh"
            image={`https://image.tmdb.org/t/p/w500${posterPath}`}
          />

          <CardContent>
            <Typography variant="h3" component="h5">
              {title}
            </Typography>


            <Typography variant="body3" component="h5">
              SINOPSE
            </Typography>

            <Typography variant="body3" color="text.secondary">
              {overview}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Data de lançamento: {formatDate(release_date)}
            </Typography>
            <div className="Rating">
              Nota Média:
              <Rating
                readOnly
                name="text-feedback"
                value={vote_average}
                max={10}
                className="Rating"
              />
              <Typography variant="body2" color="text.secondary">
                {vote_average}
              </Typography>
            </div>

            <div className="divplay">
              <Button onClick={handleOpenModalPlay} variant="contained">
                <Play size={32} color="#ffffff" weight="fill" />
                começar a assistir
              </Button>
              <Button onClick={onClose} variant="contained">
                Fechar
              </Button>
            </div>
          </CardContent>
        </CardStyle>
        <ModalPlay
          open={modalPlayOpen}
          onClose={handleCloseModalPlay}
          contentId={contentId}
          contentType={contentType}
        />
      </ModalStyle>
    </Modal>
  )
}
