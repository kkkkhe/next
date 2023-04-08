import {createEvent, createStore, Event, sample, scopeBind, createEffect} from 'effector'
import {createForm, FormApi} from "final-form";
import {$loggedIn} from './index'
type Form = FormApi<{password: string, name: string}, Partial<{password: string, name: string}>>

export const createFinalFormModel = (initialize:Event<any>) => {
    const submitTriggered = createEvent<{name: string}>({name: ''})
    const createFormFx = createEffect(async () => {
        const submit = scopeBind(submitTriggered)
        const form = createForm({
            initialValues: {
                name: '',
                password: ''
            },
            onSubmit: ({name}) => {
                submit(name)
            }
        })
        return form
    })
    console.log($loggedIn)
    const $form = createStore<Form | null>(null)
    //@ts-ignore
    sample({
        clock: initialize,
        target: createFormFx
    })
    //@ts-ignore
    sample({
        clock: createFormFx.doneData,
        target: $form
    })
    return {
        form: $form,
        submitTriggered
    }
}