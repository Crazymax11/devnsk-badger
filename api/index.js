const express = require('express')
const app = express()
const apiKey = process.env.API_KEY
const axios = require('axios')

app.get('/:groupName/events/:eventId/rsvps', async (req, res, next) => {
  const { groupName, eventId } = req.params
  const rsvps = await axios.get(
    `https://api.meetup.com/${groupName}/events/${eventId}/rsvps?key=${apiKey}`
  )

  return res.json(rsvps.data.map(({ member }) => member.name))
})

app.get('/:groupName/events', async (req, res, next) => {
  const { groupName } = req.params
  const events = await axios.get(
    `https://api.meetup.com/${groupName}/events?key=${apiKey}`
  )

  return res.json(
    events.data.map(event => ({ id: event.id, name: event.name }))
  )
})

module.exports = app
