
var a;
var sth = 1;
var ids = [];
var coli = 1;
var chartvalue = {};
var sample;

//default theme

chartvalue = {
	    "chartbackgroundcolor" : "#ffffff",
	    "charttitlecolor" : '#000000',
	    "chartsubtitlecolor" : "#000000",
	    "chartlegendcolor" : "#000000",
	    "chartlegendHovercolor" : "#000000",
	    "chartlegendHiddencolor" : "#000000",
	    "charttooltipbgcolor" : "white",
	    "charttooltipfontcolor" : "#000000",
	    "chartcreditscolor" : "#000000",
	    "chartlabelcolor" : "#000000",
	    "chartdatalableBackgroundcolor" : "#000000",
	    "chartdatalablebordercolor" : "#000000",
	    "chartdatalablecolor" : "#000000",
	    "chartmarkerlinecolor" : "#000000",
	    "series1" : "#f45b5b",
	    "series2" : "#8085e9",
	    "series3" : "#8d4654",
	    "series4" : "#7798BF",
	    "series5" : "#aaeeee",
	    "series6" : "#ff0066",
	    "series7" : "#eeaaee",
	    "series8" : "#55BF3B",
	    "series9" : "#DF5353",
	    "series10" :"#7798BF",
	    "series11" :"#aaeeee",
	    "series12" :"#8d4654"
};

//To display the first tab
$(function () {
	$('#myTab a:first').tab('show')
})

//ID of all the input element
ids = $("input[type=text]")
	.map(function () {
		return this.id;
	}).get();

$(document).ready(function () {

	changeTextboxValue();

	//export code

	$('.export').click(function () {

		//copy to clipboard script bug
		/*		$('#json').val(JSON.stringify(sample));
		$("#copy-link-wrap").zclip({
		path:'js/ZeroClipboard.swf',
		copy:$('#json').text(),
		afterCopy:function(){
		alert('d');
		}
		}); */
		//copy to textbox
		$('#text').css('display', 'block');
		var json=JSON.stringify(sample,null,10);
		json=json.replace(/"(\w+)"\s*:/g, '$1:');
		$('#preview').html(json);
		$('#json').val(json);
	});

	//To get color picker for each input
	$('input[type=text]').on('focus', function () {
		callColorPicker(this);
	});

	//to change the chart type
	$("#mySelect").change(function () {
		a = $('#mySelect').val();
		chart.options.chart.type = a;
		callColorPicker;
		chart = new Highcharts.Chart(chart.options);
	});

	$("#search").hide();

	//gloabl value
	orginal = $('#orginal').html();
	//search function
	(function ($) {
		$('#filter').keyup(function () {
			if (sth == 1) {
				$("#orginal").hide();
				$("#search").show();
				sth = 0;
			} else {
				$("#orginal").show();
				$("#search").hide();
				sth = 1;
			}
			$('#orginal tr').filter(function () {
				$(".searchable").append('<tr>' + $(this).html() + '</tr>');
			})
			if ($('#filter').val() != '') {
				$('#orginal').empty();
			} else {
				$('#orginal').append(orginal);
			}
			var rex = new RegExp($(this).val(), 'i');
			$('.searchable tr').hide();
			$('.searchable tr').filter(function () {
				$('input[type=text]').on('focus', function () {
					callColorPicker(this);
				});
				return rex.test($(this).text());
			}).show();
		})

	}
		(jQuery));

	chartfunc();

	//theme change function
	$('button').click(function () {
		//console.log(JSON.stringify(chartvalue));
		chartvalue = {};
		chartvalue = JSON.parse($(this).val());
		changeTextboxValue();
		//console.log(chartvalue);
		chartfunc();
	})

});

var changeTextboxValue = function () {
	$('#bgcolor').val(chartvalue['chartbackgroundcolor']);
	$('#title').val(chartvalue['charttitlecolor']);
	$('#subtitle').val(chartvalue['chartsubtitlecolor']);
	$('#legend').val(chartvalue['chartlegendcolor']);
	$('#legendhover').val(chartvalue['chartlegendHovercolor']);
	$('#legendhidden').val(chartvalue['chartlegendHiddencolor']);
	$('#tooltipbg').val(chartvalue['charttooltipbgcolor']);
	$('#tooltip').val(chartvalue['charttooltipfontcolor']);
	$('#credits').val(chartvalue['chartcreditscolor']);
	$('#labels').val(chartvalue['chartlabelcolor']);
	$('#dlbackground').val(chartvalue['chartdatalableBackgroundcolor']);
	$('#dlborder').val(chartvalue['chartdatalablebordercolor']);
	$('#dlfont').val(chartvalue['chartdatalablecolor']);
	$('#marker').val(chartvalue['chartmarkerlinecolor']);
	for (var i = 0; i <= $('.series').length; i++) {
		$('#color_' + i).val(chartvalue['series' + [i]]);
	}
	chartfunc();
}

var changeColor = function () {
	chartvalue['chartbackgroundcolor'] = $('#bgcolor').val();
	chartvalue['charttitlecolor'] = $('#title').val();
	chartvalue['chartsubtitlecolor'] = $('#subtitle').val();
	chartvalue['chartlegendcolor'] = $('#legend').val();
	chartvalue['chartlegendHovercolor'] = $('#legendhover').val();
	chartvalue['chartlegendHiddencolor'] = $('#legendhidden').val();
	chartvalue['charttooltipbgcolor'] = $('#tooltipbg').val();
	chartvalue['charttooltipfontcolor'] = $('#tooltip').val();
	chartvalue['chartcreditscolor'] = $('#credits').val();
	chartvalue['chartlabelcolor'] = $('#labels').val();
	chartvalue['chartdatalableBackgroundcolor'] = $('#dlbackground').val();
	chartvalue['chartdatalablebordercolor'] = $('#dlborder').val();
	chartvalue['chartdatalablecolor'] = $('#dlfont').val();
	chartvalue['chartmarkerlinecolor'] = $('#marker').val();
	chartfunc();

};

var seriesColor = function (count) {
	chartvalue['series' + [count]] = $('#color_' + count).val();
	chartfunc();
};
//colorpicker functions

var callColorPicker = function (element) {
	if (element != filter) {
		$(element).ColorPicker({
			color : '#0000ff',
			onShow : function (colpkr) {
				$(colpkr).fadeIn(500);
				return false;
			},
			onHide : function (colpkr) {
				$(colpkr).fadeOut(500);
				return false;
			},
			onChange : function (hsb, hex, rgb) {
				$(element).val('#' + hex);
				searchid = $(element).attr('id');
				seval = searchid.substring(0, 2);
				cs = $(element).attr('class');
				//	console.log(cs);
				if (seval == "se") {
					searchColor();
				}
				if (cs == "series") {
					var seriescount = searchid.split('_');
					//  console.log(seriescount[1]);
					seriesColor(seriescount[1]);
				} else {
					changeColor();
				}
			}
		});
	}
};

//char code

var chart;
function chartfunc() {
	chart = new Highcharts.Chart({
			chart : {
				renderTo : 'chartContainer',
				type : a,
				backgroundColor : chartvalue.chartbackgroundcolor,
				plotBackgroundColor : 'transparent'
			},
			title : {
				style : {
					color : chartvalue.charttitlecolor,
				}
			},
			subtitle : {
				style : {
					color : chartvalue.chartsubtitlecolor,
				}
			},
			legend : {
				itemStyle : {
					color : chartvalue.chartlegendcolor
				},
				itemHoverStyle : {
					color : chartvalue.chartlegendHovercolor
				},
				itemHiddenStyle : {
					color : chartvalue.chartlegendHiddencolor
				}
			},

			tooltip : {
				backgroundColor : chartvalue.charttooltipbgcolor,
				style : {
					color : chartvalue.charttooltipfontcolor,
				}
			},
			credits : {
				style : {
					color : chartvalue.chartcreditscolor,
				}
			},
			labels : {
				style : {
					color : chartvalue.chartlabelcolor
				}
			},
			plotOptions : {
				series : {
					dataLabels : {
						color : chartvalue.chartdatalablecolor,
						style : {
							color : chartvalue.chartdatalableBackgroundcolor,
						}
					}
				}
			},
			series : [{
					color : '#333333',
					data : [{
							color : chartvalue.series1,
							y : 106.4
						}, {
							color : chartvalue.series2,
							y : 129.2
						}, {
							color : chartvalue.series3,
							y : 106.4
						}, {
							color : chartvalue.series4,
							y : 129.2
						}, {
							name : 'Point 5',
							color : chartvalue.series5,
							y : 144.0
						}, {
							color : chartvalue.series6,
							y : 176.0
						}, {
							color : chartvalue.series7,
							y : 135.6
						}, {
							color : chartvalue.series8,
							y : 148.5
						}, {
							color : chartvalue.series9,
							y : 216.4
						}, {
							color : chartvalue.series10,
							y : 194.1
						}, {
							color : chartvalue.series11,
							y : 95.6
						}, {
							color : chartvalue.series12,
							y : 54.4
						}
					]
				}
			]

		});

	//console.log(chartvalue.series1);

	sample = {
		chart : {
			backgroundColor : chartvalue.chartbackgroundcolor,
			plotBackgroundColor : 'transparent'
		},
		title : {
			style : {
				color : chartvalue.charttitlecolor,
			}
		},
		subtitle : {
			style : {
				color : chartvalue.chartsubtitlecolor,
			}
		},
		legend : {
			itemStyle : {
				color : chartvalue.chartlegendcolor
			},
			itemHoverStyle : {
				color : chartvalue.chartlegendHovercolor
			},
			itemHiddenStyle : {
				color : chartvalue.chartlegendHiddencolor
			}
		},

		tooltip : {
			backgroundColor : chartvalue.charttooltipbgcolor,
			style : {
				color : chartvalue.charttooltipfontcolor,
			}
		},
		credits : {
			style : {
				color : chartvalue.chartcreditscolor,
			}
		},
		labels : {
			style : {
				color : chartvalue.chartlabelcolor
			}
		},
		plotOptions : {
				series : {
					dataLabels : {
						color : chartvalue.chartdatalablecolor,
						style : {
							color : chartvalue.chartdatalableBackgroundcolor,
						}
					}
				}
			},

		series : [{
				color : chartvalue.series1
			}, {
				color : chartvalue.series2
			}, {
				color : chartvalue.series3
			}, {
				color : chartvalue.series4
			}, {
				color : chartvalue.series5
			}, {
				color : chartvalue.series6
			}, {
				color : chartvalue.series7
			}, {
				color : chartvalue.series8
			}, {
				color : chartvalue.series9
			}, {
				color : chartvalue.series10
			}, {
				color : chartvalue.series11
			}, {
				color : chartvalue.series12
			}
		]
	};
	//  console.log(sample);
}
