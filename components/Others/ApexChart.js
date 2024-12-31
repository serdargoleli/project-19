/*
* https://apexcharts.com/
* */

import React, { memo, useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { cloneDeep } from "lodash";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


const stateInital = {
  series: [],
  options: {
    labels: []
  }
};
const ApexChart = ({ type, state = stateInital }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient &&
        <Chart
          options={state.options}
          series={state.series}
          type={type}
          width="100%"
        />}

    </div>
  );
};


export const ApexPieChart = ({ labels = [], series = [], dataLabel = true, type = "pie", endpoint = null }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const cloneState = cloneDeep(stateInital);

  const coreValueMapping = {
    "isPaymentTrue": "true",
    "isPaymentFalse": "false"
  };

  cloneState.series = series;
  const translatedLabels = labels.map(label => {
    if (coreValueMapping[label]) {
      return t(label); // Handle special cases
    }
    return t(label); // Default translation
  });
  cloneState.options.labels = translatedLabels;

  if (endpoint) {
    cloneState.options.chart = {
      events: {
        dataPointSelection: async function(event, chartContext, config) {
          const dataPointIndex = config.dataPointIndex;
          const dataPointValue = labels[dataPointIndex];
          const urlValue = coreValueMapping[dataPointValue] || dataPointValue;
          await router.push(`/${endpoint}=${urlValue}`);
        }
      }
    };
  }
  if (dataLabel) {
    cloneState.options.dataLabels = {
      enabled: true,
      formatter: (val, { seriesIndex, w }) => {
        return ` ${w.config.series[seriesIndex]} `;
        // return ` ${w.config.series[seriesIndex]} - ${w.config.labels[seriesIndex]}`;
      },
      textAnchor: "middle"
    };
  }

  return <ApexChart state={cloneState} type={type} />;
};


/**
 *
 * @param labels
 * @param series
 * @param endpoint
 * @param ids -- Eğer labels içindeki değerler ile query atamıyorsam ids alanınıa bakarak gönderyirum. Yani qeury sorusu için kullanıyorum.
 * @return {Element}
 * @constructor
 */
export const ApexBarChart = ({ labels = [], series = [], endpoint = null, ids = null }) => {
  const router = useRouter();
  const cloneState = cloneDeep(stateInital);
  cloneState.series = [{ data: series }];
  cloneState.options.xaxis = {
    categories: [...labels],
    labels: {
      rotate: -45,
      style: {
        fontSize: "12px"
      }
    }
  };
  cloneState.options.plotOptions = {
    bar: {
      horizontal: false
    }
  };
  cloneState.options.colors = [
    "#FF4560", "#775DD0", "#00E396", "#FEB019", "#FF4560",
    "#775DD0", "#00E396", "#FEB019", "#FF4560", "#775DD0"
  ];
  cloneState.options.tooltip = {
    enabled: true, // tooltipi gösterince tıklama almıyor
    custom: function({ series, seriesIndex, dataPointIndex, w }) {
      return "<div class=\"arrow_box p-4\">" +
        "<span>" + series[seriesIndex][dataPointIndex] + "</span>" +
        "</div>";
    }
  };
  if (endpoint) {
    cloneState.options.chart = {
      events: {
        click: async function(event, chartContext, config) {
          let dataPointIndex = config.dataPointIndex;
          let dataPointValue = null;
          if (ids && ids.length > 0) {
            dataPointValue = ids[dataPointIndex];
          } else {
            dataPointValue = config.w.config.labels[dataPointIndex];
          }
          await router.push(`/${endpoint}=${dataPointValue}`);
        }
      }
    };
  }
  return <ApexChart state={cloneState} type="bar" />;
};

export const ApexMixedChart = ({ labels = [], series = [], type, options = null }) => {
  const cloneState = cloneDeep(stateInital);
  cloneState.series = series;
  cloneState.options = {
    labels: labels
  };
  if (options) {
    cloneState.options = { ...options };
  }

  return <ApexChart state={cloneState} type={type} />;

};


export default memo(ApexChart);