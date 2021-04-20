//!set types for your variables, function parameters, state, action, dispatch type
enum EMealType {
    Breakfast='Breakfast',
    Lunch = 'Lunch',
    Dinner = 'Dinner'
}

interface IDailyNote {
    id: string
    date:string;
    username:string;
    fastingHours?:string;
    sleepingHours?:string;
    dailyNote?:string;
    note?:string;
}

interface MealNoteEntry   {
    id:string,
    date:string,
    username:string,
    mealType: EMealType,
    skippedMeal?:boolean,
    takenMed?:boolean,
    medNote?:string,
    menuDetails?: string,
    bgBe4Meal?:string|number,
    bgAftMeal?:string|number,
    bpBe4Meal?:string|number,
    bpAftMeal?:string|number,
    note?:string
}

type DailyNoteState = {
    dailyNotes: IDailyNote[]|[]
};

type DailyNoteAction = {
    type: string
    payload: IDailyNote[] |[]
};

type DispatchType = (args: DailyNoteAction)=>DailyNoteAction;