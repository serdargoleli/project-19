import {Steps as PrimereactSteps} from "primereact/steps";

const Steps = ({items, activeIndex = 0, setSelectedIndex, readOnly = false}) => {

    return <PrimereactSteps model={items} activeIndex={activeIndex} onSelect={(e) => setSelectedIndex(e.index)}
                            readOnly={readOnly}/>;
};

export default Steps;
