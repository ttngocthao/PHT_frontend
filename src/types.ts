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

export interface IDailyNote {
    id: string
    date:string
    username:string
    fastingHours?:string
    sleepingHours?:string
    dailyNote?:string
    note?:string
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
};
/**
 * * Meal Note  
 */
export type MealNoteState ={
    selectedMealType:string|undefined
};

export type MealNoteAction = {
    type:'SELECT_MEALTYPE'
    payload: string
};

export type DispatchType = (args: DailyNoteAction|MealNoteAction)=>DailyNoteAction|MealNoteAction;
//! ============== END OF TYPE FOR REDUCERS AND STATES  ============== !//