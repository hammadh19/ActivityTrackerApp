import "../StyleSheets/Pages.css";
import running_icon from "../Images/running_icon.png";
import swimming_icon from "../Images/swimming_icon.png";
import jogging_icon from "../Images/jogging_icon.png";

export default function AboutPage() {
    
    return(
        <div className="pageContainer">
            <div className="form">
                <h3 style={{ marginBottom: "20px", color: "#333" }}> About Us </h3>
                <p className="text">
                    FitnessPal is an online fitness tracking tool that can be used to calculate the amount of calories burned during an exercise.
                </p>
                <img src={jogging_icon} height={50} width={50} />
                <p className="text">
                    Creating an account is free and requires you to enter an email and password along with your weight, height, date of birth and gender.
                </p>
                <img src={swimming_icon} height={50} width={50} />
                <p className="text">
                    Fitness Pal uses your information to estimate the calories burned during an exercise using the MET value of an exercise and time taken to complete.
                </p>
                <img src={running_icon} height={50} width={50} />
                <p className="text">
                    The activities page will show you all your activities along with graphs and charts to visualise your tracking history.
                </p>
            </div>
        </div>

    )
}