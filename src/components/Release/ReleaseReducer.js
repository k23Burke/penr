import { Map, fromJS } from 'immutable';
import {
  DROP_TRACK,
  UPDATE_DURATION,
  ADD_BLANK_TRACK,
  TRACK_TITLE_CHANGE,
  UPDATE_ARTIST_NAME,
  UPDATE_ALBUM_NAME
} from '../../constants/ActionTypes'

const blankTrack = {
  audioFile: new File([], ''),
  fileSelected: false,
  title: '',
  duration: 0,
  sequence: null
}

export default function(state = Map(), action) {
  switch (action.type){
    case ADD_BLANK_TRACK :
      return state.update('tracks', arr => arr.push(fromJS(blankTrack)))
    case DROP_TRACK :
      const imageSelected = state.get('imageSelected')
      return state.update('artist', artist => artist ? artist : action.trackInfo.artist )
                  .update('album', album => album ? album : action.trackInfo.album )
                  .update('imageFile', img => imageSelected ? img : action.trackInfo.picture )
                  .update('imageSelected', imgSet => imageSelected ? imgSet : true )
                  .setIn(['tracks', action.trackIndex, 'title'], action.trackInfo.title)
                  .setIn(['tracks', action.trackIndex, 'fileSelected'], true)
                  .setIn(['tracks', action.trackIndex, 'audioFile'], action.audioFile)
                  .setIn(['tracks', action.trackIndex, 'sequence'], (action.trackIndex + 1))
                  .update('tracks', arr => arr.push(fromJS(blankTrack)))



    case UPDATE_DURATION :
      return state.setIn(['tracks', action.trackIndex, 'duration'], action.duration )
    case TRACK_TITLE_CHANGE :
      return state.setIn(['tracks', action.trackIndex, 'title'], action.name )
    case UPDATE_ALBUM_NAME :
      return state.set('album', action.name)
    case UPDATE_ARTIST_NAME :
      return state.set('artist', action.name)
  }
  return state;
}
