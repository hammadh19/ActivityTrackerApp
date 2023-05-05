import "../StyleSheets/Pages.css"
import running_icon from '../Images/running_icon.png'
import swimming_icon from '../Images/swimming_icon.png'
import jogging_icon from '../Images/jogging_icon.png'

export default function HowToUsePage() {
    
    return(
        <div className='pageContainer'>
            <div className='form'>
                <h3 className="formTitle"> How To Use </h3>
                <p className="text">
                    The Profile tab allows you to change your personal details and will calculate you BMR (Basal Metabolic Rate) based on your height, weight, age and gender.
                    This is the amount of calories needed to maintain yourself each day excluding exercise.
                </p>
                <img src={jogging_icon} height={50} width={50} />
                <p className="text">
                    The Calculator tab allows you to select an activity from the list and enter the time taken and distance travelled during the activity.
                    The activity can be added to the tracker by selecting a date and time the activity was completed.
                </p>
                <img src={swimming_icon} height={50} width={50} />
                <p className="text">
                    The Activities tab will show you all your activities along with a graph to show the amount of calories burned each day for the current week.
                    The pie chart displays the number of different activities you have completed in the last 4 weeks.
                </p>
            </div>
        </div>

    )
}