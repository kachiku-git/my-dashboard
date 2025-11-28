import ClockWidget from "../widgets/ClockWidget";
import WeatherWidget from "../widgets/WeatherWidget";
import TodayGoalWidget from "../widgets/TodayGoalWidget";

const DashboardTop = () => {
  return (
    <>
      <section className="dashboard-top">
        <div className="dashboard-display">
         <ClockWidget />
          <WeatherWidget />
        </div>
        <TodayGoalWidget/>
      </section>
    </>
  );
};

export default DashboardTop;
