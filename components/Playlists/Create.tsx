"use client"
import { CreatePlaylistInterface } from '@/lib/models/playlist.interface';
import { TrackInterface } from '@/lib/models/track.interface';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from '../Buttons/Button';
import { Stack } from 'react-bootstrap';
import Track from '../Tracks/Track';
import Icon from '../Image/Icon';

interface CreatePlaylistProps {
  track?: TrackInterface
  onSubmit: (payload: CreatePlaylistInterface, addTrack: boolean, callback: () => void) => void
  className?: string
}

function CreatePlaylist({
  track,
  className = "",
  onSubmit = (payload, addTrack, callback = () => { }) => { },
}: CreatePlaylistProps) {
  const [addTrack, setAddTrack] = useState<boolean>(Object.keys(track).length > 0)
  const [loading, setLoading] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);

  const callback = () => {
    setLoading(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      setLoading(true)
      const formData = new FormData(event.currentTarget);
      const payload = {
        name: formData.get("name").toString(),
        description: formData.get("description").toString(),
        public: formData.get("public")?.toString() === "on",
      }
      setValidated(true);
      return onSubmit(payload, addTrack, callback)
    }
  };


  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className={className}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label className='fs-14'>Name</Form.Label>
        <Form.Control name='name' type="text" required placeholder="Playlist name" disabled={loading} />
        <Form.Control.Feedback type="invalid">Field required.</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label className='fs-14'>Description</Form.Label>
        <Form.Control name='description' as="textarea" required rows={2} disabled={loading} />
        <Form.Control.Feedback type="invalid">Field required.</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="public">
        <Form.Check
          disabled={loading}
          inline
          label="Public"
          name="public"
          type="switch"
          id={`public`}
          color='light'
        />
      </Form.Group>
      {
        addTrack &&
        <div className='mt-4'>
          <p>Track to add</p>
          <Stack direction="horizontal" gap={3}>
            <Track
              showLike={false}
              showImage={true}
              showPlay={false}
              showDuration={false}
              track={track}
              className='mb-0'
            />
            <Button variant="text" icon={<Icon id='close' />} className='btn-none hover-anim' disabled={loading} onClick={() => setAddTrack(false)} />
          </Stack>
        </div>
      }
      <div className='text-end mt-4'>
        <Button type="submit" className='fs-14' variant='primary' text="Create playlist" isLoading={loading} />
        <p className='italic fs-12 mt-2'>IMPORTANT: Spotify is not provinding any API to delete playlist. use this action with caution</p>
      </div>
    </Form>
  );
}

export default CreatePlaylist;