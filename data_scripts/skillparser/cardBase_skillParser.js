function config_build(config){
	const skill_type = ['AS', 'SS'];
	for(i in skill_type){
		const s_type = config[skill_type[i]];
		for(const cate in s_type){
			let seg_cate = s_type[cate];
			seg_cate['regex'] = seg_cate.text;
			if( seg_cate['parameter'] ){
				for(let param in seg_cate['parameter']){
					const pattern = config.RegPatterns[seg_cate.parameter[param]];
					seg_cate.regex = seg_cate.regex.replace(pattern.token, pattern.regex);
				}
			}
		}
	}
	return config;
}

function Skill(skill_type, skill_info){
	this.coefficients = splitCoefficients(skill_info);
	this.segments = skill_info.replace(this.coefficients, '').trim().split(/[，|；]/);
	this.coefficients = this.coefficients
		.replace(/^(\[|\（)/, '')
		.replace(/(\]|\）)$/, '')
		.split(/[,|\/]/)
		.map(function(s){return s.split(/%\ \+\ /)})
		.reduce(function(x,y){return x.concat(y)})
		.map(function(s){return s.trim()})

	this.skill_type = getType(skill_type);
	
	let skill_compositions = classifySegmentInfo(this.segments, this.skill_type, this.coefficients);

	//for(i in this.segments){		if(this.segments[i] == "給予水屬性敵方單體超級大傷害的3連續攻擊"){
	//console.log(this.segments, this.coefficients) }}

	this.skill_detail = getSkillDetail(skill_compositions, this.coefficients, this.skill_type, skill_info);

	//console.log(this.skill_detail)

	function getType(t){
		if (t.match(/^Answer/)){
			return {
				type: 'as',
				attr_set: config.AS
			}
		}else if(t.match(/^Special/)){
			return {
				type: 'ss',
				attr_set: config.SS
			}
		}else{
			return undefined;
		}
	}

	function splitCoefficients(s){
		const index = s.search(/(\[).*(\])/);
		return index > 0 ? s.slice( index ) : '';
	}

	function classifySegmentInfo(segments, skill_type, c){
		if(!skill_type){
			return undefined;
		}
		let coe = Array()
		const attr_set = skill_type.attr_set;
		return segments.map( (seg)=> {
			let seg_attr = [];
			for (let attr in attr_set){
				result = seg.match(attr_set[attr].regex)
				if (result){
					seg_attr.push({
						'seg_name': attr,
						'seg_type': attr_set[attr].type,
						'match_result': result
					});
				}
			}
			//看有沒有沒比對到的技能
			if(seg_attr.length == 0){
				console.log(seg, segments, c);
			}
			return seg_attr;
		});
	}

	function getSkillDetail(compositions, coefficients, skill_categories){
		let skill_detail = []

		for (index in compositions){
			
			let composition = compositions[index];
			let composition_detail = [];
			
			for(order in composition){
				
				let segment = composition[order];
				let seg_config = skill_categories['attr_set'][segment['seg_name']]
				let segment_detail = {'name': segment['seg_name'], 'type': segment['seg_type']}

				//檢查全體攻擊的上一個技能語句是否為不分散攻擊，若否則為分散攻擊
				if(segment['seg_name'] == '效果-全體攻擊' && skill_detail[skill_detail.length-1] && skill_detail[skill_detail.length-1][0]['type'] == '效果-不分散全體攻擊'){
					continue;
				}

				for(info in seg_config['meta']){
					if(seg_config['meta'][info].indexOf('|') < 0){
						segment_detail[info] = seg_config['meta'][info];
					}else{
						let attr_source = seg_config['meta'][info].split('|');
						if(attr_source[0] == 'parameter'){
							for(var i=1; i<attr_source.length; i++){
								segment_detail[info] = parseInt(attr_source[i])? segment['match_result'][attr_source[i]] : attr_source[i];
								if(segment_detail[info]) break;
							}
						}else if(attr_source[0] == 'coefficient'){

							if(
								(segment['seg_name'] == '增幅-又再提升' || 
								segment['seg_name'] == '增幅-又再增傷') &&
								composition_detail[composition_detail.length-1] &&
								composition_detail[composition_detail.length-1]['name'] == '條件-問題屬性數量-all'
							){
								let effectNum = lookUpCurrentSkill(skill_detail);
								segment_detail[info] = coefficients.splice(0, effectNum*2);
							}else if(segment['seg_name'] == '效果-吸血' && skill_detail[skill_detail.length-1] && skill_detail[skill_detail.length-1][0]['type'] == '效果-自己提升攻擊'){
							//檢查吸血效果的上一個技能語句是否為自己提升攻擊，若是則拿係數的最後一個
								segment_detail[info] = coefficients.splice(-1, attr_source[1]);
							}else{
								segment_detail[info] = coefficients.splice(0, attr_source[1]);
							}
						}
					}
				}

				composition_detail.push(segment_detail);

				if(segment['seg_name'] == '條件-複屬性'){// && segment_detail['chain'] == undefined){      
					console.log(segment_detail, segment['match_result']);
					//console.log(skill_detail, skill_info);
				}
				/*if(Object.keys(segment_detail).indexOf('effect') >=0 && segment_detail['effect'] == undefined){
					console.log(segment_detail, segment['match_result']);
				}*/
			}
			skill_detail.push(composition_detail);
		}
		//console.log(skill_detail);
		return skill_detail
	}

	function lookUpCurrentSkill(skill_detail){
		for(let i = skill_detail.length-1; i >= 0; i--){
			composition = skill_detail[i];
			for(let j = composition.length-1; j >= 0; j--){
				segment = composition[j]
				if(/^效果/.test(segment['type'])){
					return segment['effect'].length;
				}
			}
		}
		return 0;
	}
}


const config = config_build(require('./skillParser_configs.js'))
//console.log(config.AS)

module.exports = {
	parse: function(skill_type, skill_info){
		var skill = new Skill(skill_type, skill_info);
		return skill.skill_detail;
	}
};
