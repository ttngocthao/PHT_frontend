import React from "react";

const mealNoteTesting = () => {
  return (
    <div>
      <h3>Breakfast</h3>
      {selectedDayNote.breakfast ? (
        <>
          {editMode && (
            <SettingBtns
              mealType="Breakfast"
              editMealMode={false}
              editMealHandle={editMealHandle}
            />
          )}
          {/* <Button color='orange' onClick={()=>alert('edit meal note')}>
                        {editMode ? 'Finish Editing' : 'Edit Breakfast Details'}
                    </Button> */}
          <MealNote data={selectedDayNote.breakfast} />
        </>
      ) : (
        <Button
          className="ui button"
          color="teal"
          onClick={() => showMealFormHandle(selectedDayNote.id, "Breakfast")}
        >
          Add Breakfast details
        </Button>
      )}
      <br />
    </div>
  );
};

export default mealNoteTesting;
