// import * as actionTypes from './store/actionConstants';
//!set types for your variables, function parameters, state, action, dispatch type
export enum MealType {
    Breakfast='Breakfast',
    Lunch = 'Lunch',
    Dinner = 'Dinner'
}

export type MealTypeOption = {
    value: MealType
    label:string
};

export type Measurement  ={
    time: string,
    readingNo: string
};

export type Medication ={
    time: string,
    medName: string
};

export interface IDailyNote {
    id: string
    date:string
    username:string
    fastingHours?:string
    sleepingHours?:string
    dailyNote?:string
    note?:string
    bloodPressure?:Measurement[],
    bloodGlucose?:Measurement[],
    medication?:Medication[],
    activities?:string,
    beverages?: string
    breakfast?: MealNoteEntry
    lunch?: MealNoteEntry
    dinner?: MealNoteEntry
}

export interface MealNoteEntry   {
    id:string
    date:string
    username:string
    mealType: MealType.Breakfast | MealType.Lunch | MealType.Dinner
    skippedMeal?:boolean
    takenMed?:boolean
    medNote?:string
    menuDetails?: string
    bgBe4Meal?:string|number
    bgAftMeal?:string|number
    bpBe4Meal?:string|number
    bpAftMeal?:string|number
    note?:string
}




export type EntryDailyNoteFormValue = Omit<IDailyNote,'id'>;
export type EntryMealNoteFormValue = Omit<MealNoteEntry,'id'>;
export type MealNoteProps = Omit<MealNoteEntry,'id'|'date'|'username'>;


/**
*? THESE ARE FOR REDUCERS AND STATES 
*/
/**
 * * Daily Note  
 */
export type DailyNoteState = {
    dailyNotes: IDailyNote[]|[],
    selectedDayNote: IDailyNote | undefined
    selectedDate: Date 
    selectedMealType: string | undefined,
    currentUser:string|undefined,
    editMode: boolean
};



export type InitDailyNotesPayload ={
    dailyNotes: IDailyNote[]|[],
    selectedDayNote: IDailyNote | undefined
};

export type DailyNoteAction = {
    type: 'GET_DAILYNOTES'
    payload: IDailyNote[] |[] 
}|{
    type: 'INIT_DAILYNOTES'
    payload: InitDailyNotesPayload 
}|{
    type: 'GET_DAYNOTE'
    payload: IDailyNote |undefined
}|{
    type:'SET_DATE'
    payload:string
}|{
    type:'ADD_DAYNOTE'
    payload: IDailyNote
}|{
    type:'SELECT_DATE'
    payload: Date 
}|{
    type:'UPDATE_DAILYNOTE'
    payload:IDailyNote
}|{
    type:'SELECT_MEALTYPE'
    payload: string
}|{
    type:'ADD_MEALNOTE'
    payload:MealNoteEntry
}|{
    type:'TOGGLE_EDITMODE'
};


export type DispatchType = (args: DailyNoteAction)=>DailyNoteAction;
//! ============== END OF TYPE FOR REDUCERS AND STATES  ============== !//