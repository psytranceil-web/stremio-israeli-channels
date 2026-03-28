"use strict";

const { getAllChannels, getChannelById } = require("./channels");

const PAGE_SIZE = 100;

function channelToMeta(ch) {
  const hasStreams = ch.streams && ch.streams.length > 0;
  return {
    id: ch.id,
    type: "tv",
    name: ch.name,
    logo: ch.logo || null,
    poster: ch.logo || null,
    posterShape: "square",
    background: ch.logo || null,
    genres: ch.genre || [],
    description: hasStreams
      ? `📺 ${ch.name} – שידור חי`
      : `📺 ${ch.name} – בקרוב (הוסף קישור מ-GuruTv.online)`,
    links: [],
  };
}

function catalogHandler({ type, id, extra }) {
  if (type !== "tv" || id !== "israeli-live") {
    return Promise.resolve({ metas: [] });
  }
  let channels = getAllChannels();
  if (extra && extra.genre) {
    channels = channels.filter((ch) => ch.genre && ch.genre.includes(extra.genre));
  }
  if (extra && extra.search) {
    const q = extra.search.toLowerCase();
    channels = channels.filter((ch) => ch.name.toLowerCase().includes(q));
  }
  const skip = parseInt((extra && extra.skip) || 0, 10);
  const page = channels.slice(skip, skip + PAGE_SIZE);
  return Promise.resolve({ metas: page.map(channelToMeta) });
}

function metaHandler({ type, id }) {
  if (type !== "tv") return Promise.resolve({ meta: null });
  const ch = getChannelById(id);
  if (!ch) return Promise.resolve({ meta: null });
  return Promise.resolve({ meta: channelToMeta(ch) });
}

function streamHandler({ type, id }) {
  if (type !== "tv") return Promise.resolve({ streams: [] });
  const ch = getChannelById(id);
  if (!ch || !ch.streams || ch.streams.length === 0) {
    return Promise.resolve({ streams: [] });
  }
  const streams = ch.streams.map((s) => ({
    name: s.label || ch.name,
    title: `📺 ${s.label || ch.name}${s.quality ? ` [${s.quality}]` : ""}`,
    url: s.url,
    // headers עבור ערוצים שדורשים Referer/Origin (קשת 12 וכו')
    ...(s.headers ? { behaviorHints: { notWebReady: false, headers: s.headers } } : { behaviorHints: { notWebReady: false } }),
  }));
  return Promise.resolve({ streams });
}

module.exports = { catalogHandler, metaHandler, streamHandler };
