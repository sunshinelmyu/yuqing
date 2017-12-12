'use strict';

(function () {

    var proxy = {
        click: null
    };

    var option = {
        tooltip: {
            trigger: 'item',
            showDelay: 200,
            // hideDelay: 1000,
            enterable: true,
            borderColor: '#313948',
            borderWidth: 1,
            backgroundColor: 'rgba(90,97,112,0.9)',
            formatter: function formatter(params, ticket, callback) {
                // console.log(params)
                if (params.seriesType == "map") {
                    if (!params.name) {
                        return;
                    } else {
                        return '' + '<div style="font-size: 16px; padding: 10px;">' + '<div>' + '<span style="font-size: 16px; padding-right: 10px; font-weight: bold;">' + params.data.name + '</span>' + '<span>' + params.data.value + '</span>' + '</div>' + '</div>';
                    }
                } else {
                    return params.data.value1 + '<br/>' + params.data.name;
                }
                //console.log(params)
            }
        },
        visualMap: {
            type: 'piecewise',
            splitNumber: 10,
            itemGap: 3,
            textGap: 130,
            itemSymbol: 'rect',
            min: 1,
            left: 'left',
            bottom: '50',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            color: ["#ff4b4b", "#ff6a28", "#ffa349", "#efcf6f", "#2655a9", "#3a7be8", "#3996ff", "#4bb1ff", "#7fcbff", "#a7dafd"]
        },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            show: true,
            symbol: "none"

        },
        series: [{
            roam: false,
            type: "map",
            map: 'china',
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1,
                    areaColor: "#e9ecf0"
                },
                emphasis: {
                    areaColor: "#4bb1ff",
                    opacity: 0.7
                }
            },
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: "#2f2f30"
                    }
                },
                emphasis: {
                    show: false
                }
            },
            showLegendSymbol: false
        }, {
            name: "正面",
            type: 'effectScatter',
            effectType: 'ripple',
            showEffectOn: 'emphasis',
            coordinateSystem: 'geo'
        }, {
            name: "中性",
            type: 'effectScatter',
            effectType: 'ripple',
            showEffectOn: 'emphasis',
            coordinateSystem: 'geo'
        }, {
            name: "负面",
            type: 'effectScatter',
            effectType: 'ripple',
            showEffectOn: 'emphasis',
            coordinateSystem: 'geo'
        }]
    };
    // 指定图表的配置项和数据
    var main = function main(p) {
        $.get('../../Lib/map/china.json', function (chinaJson) {
            echarts.registerMap('china', chinaJson);
            _render_init_(p);
            _render_set_(p);
        });
        return proxy;
    };

    // 命名空间
    var _render_ = function _render_() {}
    // null


    // 指定图表的配置项和数据
    ;var _render_init_ = function _render_init_(p) {
        var e = _render_.element = document.getElementById(p.id);

        e.style.width = p.width + 'px';
        e.style.height = p.height + 'px';
    };

    var _render_set_ = function _render_set_(p) {

        option.series[0].data = p.data[0];
        option.series[1].data = p.data[1];
        option.series[2].data = p.data[2];

        var myChart = echarts.init(_render_.element);
        myChart.setOption(option);

        var provinceList = [{
            "id": "shanghai",
            "name": "上海"
        }, {
            "id": "hebei",
            "name": "河北"
        }, {
            "id": "shanxi",
            "name": "山西"
        }, {
            "id": "neimenggu",
            "name": "内蒙古"
        }, {
            "id": "liaoning",
            "name": "辽宁"
        }, {
            "id": "jilin",
            "name": "吉林"
        }, {
            "id": "heilongjiang",
            "name": "黑龙江"
        }, {
            "id": "jiangsu",
            "name": "江苏"
        }, {
            "id": "zhejiang",
            "name": "浙江"
        }, {
            "id": "anhui",
            "name": "安徽"
        }, {
            "id": "fujian",
            "name": "福建"
        }, {
            "id": "jiangxi",
            "name": "江西"
        }, {
            "id": "shandong",
            "name": "山东"
        }, {
            "id": "henan",
            "name": "河南"
        }, {
            "id": "hubei",
            "name": "湖北"
        }, {
            "id": "hunan",
            "name": "湖南"
        }, {
            "id": "guangdong",
            "name": "广东"
        }, {
            "id": "guangxi",
            "name": "广西"
        }, {
            "id": "hainan",
            "name": "海南"
        }, {
            "id": "sichuan",
            "name": "四川"
        }, {
            "id": "guizhou",
            "name": "贵州"
        }, {
            "id": "yunnan",
            "name": "云南"
        }, {
            "id": "xizang",
            "name": "西藏"
        }, {
            "id": "shanxi1",
            "name": "陕西"
        }, {
            "id": "gansu",
            "name": "甘肃"
        }, {
            "id": "qinghai",
            "name": "青海"
        }, {
            "id": "ningxia",
            "name": "宁夏"
        }, {
            "id": "xinjiang",
            "name": "新疆"
        }, {
            "id": "beijing",
            "name": "北京"
        }, {
            "id": "tianjin",
            "name": "天津"
        }, {
            "id": "chongqing",
            "name": "重庆"
        }, {
            "id": "xianggang",
            "name": "香港"
        }, {
            "id": "taiwan",
            "name": "台湾"
        }, {
            "id": "aomen",
            "name": "澳门"
        }];
        var provinceMap = {};
        provinceList.forEach(function (item, i) {
            provinceMap[item.name] = item;
        });
        var currentMap = null;

        function showMap(id, name) {

            option.series[0].map = id;
            option.geo.map = id;

            myChart.setOption(option, true);

            id != "china" ? icon0.show() : icon0.hide();

            currentMap = id;
        }

        function showProvince(province) {
            $.get('../../Lib/map/province/' + province.id + '.json', function (geoJson) {
                echarts.registerMap(province.id, geoJson);
                showMap(province.id, province.name);
            });
        }

        // Draw icon
        var zr = myChart.getZr();

        var icon0 = new echarts.graphic.Rect({
            shape: {
                position: [100, 200], // 平移，默认值为 [0, 0]。
                scale: [2, 2], // 缩放，默认值为 [1, 1]。表示缩放的倍数。
                width: 100,
                height: 30
            },
            z: 2,
            style: {
                text: '返回全局地图',
                stroke: '#62a0f3',
                fill: '#eff5fe'
            },
            position: [zr.getWidth() - 108, zr.getHeight() - zr.getHeight()]
        });

        var group = new echarts.graphic.Group();
        group.add(icon0);
        zr.add(group);

        icon0.on('click', function () {

            option.series[1].data = p.data[1];

            showMap("china", "中国");
        });

        myChart.on("click", function (d) {

            if (typeof proxy.click === "function") proxy.click(d);

            if (currentMap == "china") {
                // console.log(d.name)
                showProvince(provinceMap[d.name]);
                //echarts
                var data = [];
                for (var num = 1; num < 1; num++) {
                    for (var i = 0; i < p.data[num].length; i++) {
                        if (d.name == p.data[num][i].province) {
                            data.push(p.data[num][i]);
                        }
                    }
                    option.series[num].data = data;
                }
            }

            //console.log(option)
        });

        showMap("china", "1111");

        //点击提示框打开空白页

        // $(document).click(function( /* event */ e) {
        //     var tip = 'main';
        //
        //     // id
        //     if($(e.target).is('#' + tip + ' a')) {
        //         // window.open('about:black');
        //         window.open('./publicOpinionTrend.html');
        //     }
        //
        // });
    };

    window.map_ls = main;
})();