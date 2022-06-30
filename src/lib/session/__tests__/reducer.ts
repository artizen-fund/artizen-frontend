import { questionnaireReducer } from "../reducer"
import { initialState } from "../state"
import {
  SetErrorCountAction,
  SetAnswersAction,
  SetAnswerAction,
} from "../actions"

describe("questionnaireReducer", () => {
  const sampleBundle: SetAnswersAction = {
    type: "setAnswers",
    payload: {
      answers: [
        {
          _key: "abc123",
          required: false,
          answer: undefined,
        },
      ],
    },
  }

  it("creates an answer bundle", () => {
    const newState = questionnaireReducer(initialState, sampleBundle)
    expect(newState.answers.length).toEqual(1)
  })

  it("sets an answer", () => {
    const firstState = questionnaireReducer(initialState, sampleBundle)
    expect(firstState.answers.find(a => a._key === "abc123")?.answer).toEqual(
      undefined
    )
    const testAction: SetAnswerAction = {
      type: "setAnswer",
      payload: {
        _key: "abc123",
        answer: "ICU81MI",
      },
    }
    const newState = questionnaireReducer(firstState, testAction)
    expect(
      newState.answers.find(a => a._key === testAction.payload._key)?.answer
    ).toEqual("ICU81MI")
  })

  it("sets an error", () => {
    const firstState = questionnaireReducer(initialState, sampleBundle)
    expect(
      firstState.answers.find(a => a._key === "abc123")?.errorCount
    ).toEqual(undefined)
    const testAction: SetErrorCountAction = {
      type: "setErrorCount",
      payload: {
        _key: "abc123",
        errorCount: 5,
      },
    }
    const newState = questionnaireReducer(firstState, testAction)
    expect(
      newState.answers.find(a => a._key === testAction.payload._key)?.errorCount
    ).toEqual(5)
  })
})
