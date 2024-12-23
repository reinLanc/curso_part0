import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }
    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('state is reset to zero', () => {
    const action = {
      type: 'ZERO'
    }
    const state = {
      good: 5,
      ok: 3,
      bad: 2
    }
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual(initialState)
  })

  test('handles multiple actions sequentially', () => {
    const actions = [
      { type: 'GOOD' },
      { type: 'GOOD' },
      { type: 'OK' },
      { type: 'BAD' },
      { type: 'BAD' }
    ]
    let state = initialState
    deepFreeze(state)

    actions.forEach(action => {
      state = counterReducer(state, action)
    })

    expect(state).toEqual({
      good: 2,
      ok: 1,
      bad: 2
    })
  })

  test('unknown action does not modify the state', () => {
    const state = {
      good: 3,
      ok: 2,
      bad: 1
    }
    deepFreeze(state)

    const action = { type: 'UNKNOWN_ACTION' }
    const newState = counterReducer(state, action)

    expect(newState).toEqual(state)
  })

  test('handles an alternative initial state', () => {
    const state = {
      good: 10,
      ok: 5,
      bad: 2
    }
    deepFreeze(state)

    const action = { type: 'GOOD' }
    const newState = counterReducer(state, action)

    expect(newState).toEqual({
      good: 11,
      ok: 5,
      bad: 2
    })
  })

  test('previous state remains unchanged', () => {
    const action = { type: 'GOOD' }
    const state = initialState
    deepFreeze(state)

    const newState = counterReducer(state, action)

    expect(state).toEqual(initialState)
    expect(newState).not.toBe(state)

  })
})
