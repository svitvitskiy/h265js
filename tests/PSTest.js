function _fromBits(str) {
	var digits = str.replace(/[^01]/gi, '');
	
	var arr = [];
	for(var i = 0; i < digits.length; i += 8) {
		var l = Math.min(digits.length - i, 8);
		var val = parseInt(digits.substr(i, l), 2) << (8 - l);
		arr.push(val);
	}
	
	return new Uint8Array(arr);
}
function testPPS() {
	var data = _fromBits('0000001000000 000010000 1 1 000 1 1 0001111 0001111' +
	'00000110010 1 1 1 00110 000011000 000011000 1 1 1 1 1 1' +
	'00110 00110 0 010 010 010 010 010 010 010 010 010 010 1 1 1 1 0' +
	'0001001 0001001 1'+
	'1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1'+
	'1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1'+
	'1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1'+
	'1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1'+
	'1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1'+
	'1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1'+
	'0 010 0 010 0 010 0 010 0 010 0 010' +
	'0 010 0 010 0 010 0 010 0 010 0 010' +
	'0 010 0 010' +
	'1 00110 0');
	var reader = new BitReader(data.buffer);
	
	var pps = PPS.read(reader);
	
	Test.assertEquals(63, pps.pps_pic_parameter_set_id);
	Test.assertEquals(15, pps.pps_seq_parameter_set_id);
	Test.assertEquals(1, pps.dependent_slice_segments_enabled_flag);
	Test.assertEquals(1, pps.output_flag_present_flag);
	Test.assertEquals(0, pps.num_extra_slice_header_bits);
	Test.assertEquals(1, pps.sign_data_hiding_enabled_flag);
	Test.assertEquals(1, pps.cabac_init_present_flag);
	Test.assertEquals(14, pps.num_ref_idx_l0_default_active_minus1);
	Test.assertEquals(14, pps.num_ref_idx_l1_default_active_minus1);
	Test.assertEquals(25, pps.init_qp_minus26);
	Test.assertEquals(1, pps.constrained_intra_pred_flag);
	Test.assertEquals(1, pps.transform_skip_enabled_flag);
	Test.assertEquals(1, pps.cu_qp_delta_enabled_flag);
	Test.assertEquals(5, pps.diff_cu_qp_delta_depth);
	Test.assertEquals(12, pps.pps_cb_qp_offset);
	Test.assertEquals(12, pps.pps_cr_qp_offset);
	Test.assertEquals(1, pps.pps_slice_chroma_qp_offsets_present_flag);
	Test.assertEquals(1, pps.weighted_pred_flag);
	Test.assertEquals(1, pps.weighted_bipred_flag);
	Test.assertEquals(1, pps.transquant_bypass_enabled_flag);
	Test.assertEquals(1, pps.tiles_enabled_flag);
	Test.assertEquals(1, pps.entropy_coding_sync_enabled_flag);
	Test.assertEquals(5, pps.num_tile_columns_minus1);
	Test.assertEquals(5, pps.num_tile_rows_minus1);
	Test.assertEquals(0, pps.uniform_spacing_flag);
			
	for( var i = 0; i < pps.num_tile_columns_minus1; i++ )
		Test.assertEquals(1, pps.column_width_minus1[ i ]);

	for( var i = 0; i < pps.num_tile_rows_minus1; i++ )
		Test.assertEquals(1, pps.row_height_minus1[ i ]);
		
	Test.assertEquals(1, pps.loop_filter_across_tiles_enabled_flag);
	Test.assertEquals(1, pps.pps_loop_filter_across_slices_enabled_flag);
	Test.assertEquals(1, pps.deblocking_filter_control_present_flag);
	Test.assertEquals(1, pps.deblocking_filter_override_enabled_flag);
	Test.assertEquals(0, pps.pps_deblocking_filter_disabled_flag);
	Test.assertEquals(-4, pps.pps_beta_offset_div2);
	Test.assertEquals(-4, pps.pps_tc_offset_div2);
	Test.assertEquals(1, pps.pps_scaling_list_data_present_flag);
	
	testScalingList(pps.scaling_list_data);
		
	Test.assertEquals(1, pps.lists_modification_present_flag);
	Test.assertEquals(5, pps.log2_parallel_merge_level_minus2);
	Test.assertEquals(0, pps.slice_segment_header_extension_present_flag);
}

function testScalingList(sl) {
	Test.assertEquals(1, sl.scaling_list_pred_mode_flag[ 0 ][ 0 ]);
	Test.assertEquals(1, sl.scaling_list_pred_mode_flag[ 0 ][ 1 ]);
	Test.assertEquals(1, sl.scaling_list_pred_mode_flag[ 0 ][ 2 ]);
	Test.assertEquals(1, sl.scaling_list_pred_mode_flag[ 0 ][ 3 ]);
	Test.assertEquals(1, sl.scaling_list_pred_mode_flag[ 0 ][ 4 ]);
	Test.assertEquals(1, sl.scaling_list_pred_mode_flag[ 0 ][ 5 ]);
	
	Test.assertEquals(0, sl.scaling_list_pred_mode_flag[ 1 ][ 0 ]);
	Test.assertEquals(0, sl.scaling_list_pred_mode_flag[ 1 ][ 1 ]);
	Test.assertEquals(0, sl.scaling_list_pred_mode_flag[ 1 ][ 2 ]);
	Test.assertEquals(0, sl.scaling_list_pred_mode_flag[ 1 ][ 3 ]);
	Test.assertEquals(0, sl.scaling_list_pred_mode_flag[ 1 ][ 4 ]);
	Test.assertEquals(0, sl.scaling_list_pred_mode_flag[ 1 ][ 5 ]);
	
	Test.assertEquals(0, sl.scaling_list_pred_mode_flag[ 2 ][ 0 ]);
	Test.assertEquals(0, sl.scaling_list_pred_mode_flag[ 2 ][ 1 ]);
	Test.assertEquals(0, sl.scaling_list_pred_mode_flag[ 2 ][ 2 ]);
	Test.assertEquals(0, sl.scaling_list_pred_mode_flag[ 2 ][ 3 ]);
	Test.assertEquals(0, sl.scaling_list_pred_mode_flag[ 2 ][ 4 ]);
	Test.assertEquals(0, sl.scaling_list_pred_mode_flag[ 2 ][ 5 ]);
	
	Test.assertEquals(0, sl.scaling_list_pred_mode_flag[ 3 ][ 0 ]);
	Test.assertEquals(0, sl.scaling_list_pred_mode_flag[ 3 ][ 1 ]);
}

Test.add(testPPS);