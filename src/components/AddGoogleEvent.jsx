import React from 'react'

export default function AddGoogleEvent({ event }) {
  const createGoogleCalendarUrl = () => {
    const eventDate = new Date(event.eventDate);
    const endDate = new Date(event.eventEndDate || eventDate.getTime() + (2 * 60 * 60 * 1000));

    const params = {
      action: 'TEMPLATE',
      text: event.title,
      details: event.description.replace(/<[^>]*>/g, ''),
      location: event.location || 'Belirtilmedi',
      dates: `${eventDate.toISOString().replace(/-|:|\.\d+/g, '')}/${endDate.toISOString().replace(/-|:|\.\d+/g, '')}`
    };

    
    const url = `https://calendar.google.com/calendar/render?${Object.keys(params)
      .map(key => `${key}=${encodeURIComponent(params[key])}`)
      .join('&')}`;

    return url;
  };

  return (
    <a
      href={createGoogleCalendarUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-primary btn-outline gap-2"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="w-5 h-5"
      >
        <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
        <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
      </svg>
      Takvime Ekle
    </a>
  );
}