class ChartDecorator extends ChartConfig {

	applyBorderColor(chartConfig){
		chartConfig.borderColor = chartConfig.getborderColor(chartConfig.chartData.length);
	}
}

class BarChartDecorator extends ChartDecorator {

	applyBackgroundColor(chartConfig){
		chartConfig.backgroundColor = chartConfig.getbgColor(chartConfig.chartData.length);
	}
}

class PieChartDecorator extends ChartDecorator {

	applyBackgroundColor(chartConfig){
		chartConfig.backgroundColor = chartConfig.getbgColor(chartConfig.chartData.length);
	}
}

class DoughnutChartDecorator extends ChartDecorator {

	applyBackgroundColor(chartConfig){
		chartConfig.backgroundColor = chartConfig.getbgColor(chartConfig.chartData.length);
	}
}

class LineChartDecorator extends ChartDecorator {
}


class StackedChartDecorator extends BarChartDecorator {
	applyBackgroundColor(chartConfig){
		chartConfig.backgroundColor = chartConfig.getbgColor(chartConfig.chartData.length);
	}
}

class PivotChartDecorator extends ChartDecorator {
	applyBackgroundColor(chartConfig){
		chartConfig.backgroundColor = chartConfig.getbgColor(chartConfig.chartData.length);
	}
}