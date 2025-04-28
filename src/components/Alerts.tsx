import { useEffect } from "react";
import useAlerts from "../app/store/useAlerts";

export default function Alerts() {
  const { alerts, removeAlert } = useAlerts();
  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-2">
      {alerts.map((alert: { title: string; id: number }) => (
        <Alert
          key={alert.id}
          title={alert.title}
          close={() => removeAlert(alert.id)}
        />
      ))}
    </div>
  );
}

function Alert(props: { title: string; close: () => void }) {
  useEffect(() => {
    const timeoutDelete = setTimeout(() => {
      props.close();
    }, 2500);
    return () => {
      clearTimeout(timeoutDelete);
    };
  }, []);

  return (
    <div className="relative h-[50px] w-[250px] bg-[rgb(36,36,36)] shadow-xl alert_anim">
      <p className=" flex-1 text-textHead flex justify-center items-center h-full">
        {props.title}
      </p>
      <div className=""></div>
    </div>
  );
}
