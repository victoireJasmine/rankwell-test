<template>
    <div>
        <Bar 
            :chartData="chartData"
            :chartOptions="chartOptions"
            :chartId="chartId"
            :width="width"
            :height="height"
            :cssClasses="cssClasses"
            :styles="styles"
            :plugins="plugins"
        />
    </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: 'BarChartComponent',
  props: {
    chartData: {
       type: Object,
       required: true
    },
    chartId: {
      type: String,
      default: "bar-chart"
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: "",
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
   components: {
    Bar,
  },
  data:()=>({
    chartOptions : {
        responsive: true,
        maintainAspectRatio: false
    }
  })
}
</script>

<style scoped>
 
</style>