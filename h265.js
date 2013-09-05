/*
 * H.265 ( HEVC ) decoder.
 * 
 * This software is distributed under FreeBSD licence
 *  
 * @author Stanislav Vitvitskiy ( stanislav.vitvitskiy@gmail.com )
 */
function H265Decoder() {
	
}

H265Decoder.prototype.decode = function(binary, pixelBuffer) {
	
	return new Picture(0, 0, pixelBuffer, 0);
}


/**
 * Picture
 */

function Picture(width, height, data, color) {
	this._width = width;
	this._height = height;
	this._data = data;
	this._color = color;
}

/**
 * Sequence parameter set
 */

function SPS() {
	
}

SPS.read = function(bitReader) {
	
	
}

/**
 * Picture parameter set
 */

function PPS() {
	
}

PPS.readScalingListData = function(bitReader) {
	var sl = {};
	
	sl.scaling_list_pred_mode_flag = [];
	sl.scaling_list_pred_matrix_id_delta = [];
	sl.scaling_list_dc_coef_minus8 = [];
	sl.ScalingList = [];
	
	for( var sizeId = 0; sizeId < 4; sizeId++ ) {
		sl.scaling_list_pred_mode_flag[sizeId] = [];
		sl.scaling_list_pred_matrix_id_delta[sizeId] = [];
		sl.scaling_list_dc_coef_minus8[sizeId] = [];
		sl.ScalingList[sizeId] = [];
		
		for(matrixId=0;matrixId<((sizeId == 3)?2:6);matrixId++) {
			sl.scaling_list_pred_mode_flag[ sizeId ][ matrixId ] = bitReader.read(1);

			if( sl.scaling_list_pred_mode_flag[ sizeId ][ matrixId ] == 0)
				sl.scaling_list_pred_matrix_id_delta[ sizeId ][ matrixId ] = GolombReader.readU(bitReader);
			else {
				var nextCoef = 8
				var coefNum = Math.min(64,(1 << (4+(sizeId << 1))))
				
				if( sizeId > 1 ) {
					sl.scaling_list_dc_coef_minus8[ sizeId-2 ][ matrixId ] = GolombReader.readS(bitReader);
					nextCoef = sl.scaling_list_dc_coef_minus8[ sizeId-2 ][ matrixId ] + 8;
				}
				sl.ScalingList[ sizeId ][ matrixId ] = [];
				for( var i = 0; i < coefNum; i++) {
					var scaling_list_delta_coef = GolombReader.readS(bitReader);
					nextCoef = ( nextCoef + scaling_list_delta_coef + 256 ) % 256;
					sl.ScalingList[ sizeId ][ matrixId ][ i ] = nextCoef;
				}
			}
		}
	}
		
	return sl;
}

PPS.read = function(bitReader) {
	var pps = new PPS();
	pps.pps_pic_parameter_set_id = GolombReader.readU(bitReader);
	pps.pps_seq_parameter_set_id = GolombReader.readU(bitReader);
	pps.dependent_slice_segments_enabled_flag = bitReader.read(1);
	pps.output_flag_present_flag = bitReader.read(1);
	pps.num_extra_slice_header_bits = bitReader.read(3);
	pps.sign_data_hiding_enabled_flag = bitReader.read(1);
	pps.cabac_init_present_flag = bitReader.read(1);
	pps.num_ref_idx_l0_default_active_minus1 = GolombReader.readU(bitReader);
	pps.num_ref_idx_l1_default_active_minus1 = GolombReader.readU(bitReader);
	pps.init_qp_minus26 = GolombReader.readS(bitReader);
	pps.constrained_intra_pred_flag = bitReader.read(1);
	pps.transform_skip_enabled_flag = bitReader.read(1);
	pps.cu_qp_delta_enabled_flag = bitReader.read(1);
	
	if( pps.cu_qp_delta_enabled_flag != 0 )
		pps.diff_cu_qp_delta_depth = GolombReader.readU(bitReader);

	pps.pps_cb_qp_offset = GolombReader.readS(bitReader);
	pps.pps_cr_qp_offset = GolombReader.readS(bitReader);
	pps.pps_slice_chroma_qp_offsets_present_flag = bitReader.read(1);
	pps.weighted_pred_flag = bitReader.read(1);
	pps.weighted_bipred_flag = bitReader.read(1);
	pps.transquant_bypass_enabled_flag = bitReader.read(1);
	pps.tiles_enabled_flag = bitReader.read(1);
	pps.entropy_coding_sync_enabled_flag =bitReader.read(1);
	
	if( pps.tiles_enabled_flag != 0) {
		pps.num_tile_columns_minus1= GolombReader.readU(bitReader);

		pps.num_tile_rows_minus1= GolombReader.readU(bitReader);

		pps.uniform_spacing_flag = bitReader.read(1);

		if( pps.uniform_spacing_flag == 0) {
			pps.column_width_minus1 = [];
			pps.row_height_minus1 = [];
			for( var i = 0; i < pps.num_tile_columns_minus1; i++ )
				pps.column_width_minus1[ i ] = GolombReader.readU(bitReader);
			
			for( var i = 0; i < pps.num_tile_rows_minus1; i++ )
				pps.row_height_minus1[ i ] = GolombReader.readU(bitReader);
		}
		pps.loop_filter_across_tiles_enabled_flag = bitReader.read(1);
	}
	pps.pps_loop_filter_across_slices_enabled_flag = bitReader.read(1);
	pps.deblocking_filter_control_present_flag = bitReader.read(1);
	if( pps.deblocking_filter_control_present_flag ) {
		pps.deblocking_filter_override_enabled_flag = bitReader.read(1);
		pps.pps_deblocking_filter_disabled_flag = bitReader.read(1);
		
		if( pps.pps_deblocking_filter_disabled_flag == 0) {
			pps.pps_beta_offset_div2 = GolombReader.readS(bitReader);
			pps.pps_tc_offset_div2 = GolombReader.readS(bitReader);
		}
	}
	pps.pps_scaling_list_data_present_flag = bitReader.read(1);

	if( pps.pps_scaling_list_data_present_flag != 0 )
		pps.scaling_list_data = PPS.readScalingListData( bitReader );
		
	pps.lists_modification_present_flag = bitReader.read(1);

	pps.log2_parallel_merge_level_minus2 = GolombReader.readU(bitReader);
	pps.slice_segment_header_extension_present_flag = bitReader.read(1);
	
	return pps;
}

/**
 * ByteBuffer
 */
function ByteBuffer() {
	this._pos = 0;
	this._limit = 0;
}

ByteBuffer.allocate = function() {
	
}

ByteBuffer.wrap = function(ui8a) {
	
}



/**
 * Bitstream reader
 *
 */

function BitReader(arrayBuffer) {
	if(!(arrayBuffer instanceof ArrayBuffer))
		throw 'IllegalArgument: ArrayBuffer extpected';
	this.array = new Uint8Array(arrayBuffer);
	this.arrayPos = 0;
	this.cur32 = 0;
	this.deficit = 32;
	this._readIgnore();
}

BitReader.prototype._readIgnore = function() {
	if(this.arrayPos < this.array.length) {
		this.deficit -= 8;
		this.cur32 |= (this.array[this.arrayPos++] << this.deficit);
	}
}

BitReader.prototype.check16 = function() {
	if(this.deficit > 16) {
		this._readIgnore();
		this._readIgnore();
	}
	return this.cur32 >>> 16;
}

BitReader.prototype.skip = function(n) {
	this.deficit += n;
	this.cur32 <<= n;
}

BitReader.prototype.read = function(n) {
	var val = this.check16();
	this.skip(n);
	return (val << n) >>> 16;
}

/**
 * ExpGOLOMB reader
 *
 */

function GolombReader() {
	
}

GolombReader.readU = function(bitReader) {
	var bits = bitReader.check16();
	var len = (MathUtils.zeros(bits >> 8) << 1) + 1;
	bitReader.skip(len);

	return ((bits << len) >> 16) - 1;
}

GolombReader.readS = function(bitReader) {
	var ue = GolombReader.readU(bitReader);
	var sign = ((ue & 0x1) << 1) - 1;
	return ((ue >> 1) + (ue & 0x1)) * sign;
}

GolombReader.readT = function() {
	
}

/**
 * Math utils
 */
function MathUtils() {
	
}

MathUtils._ZEROS_LOOKUP_TAB = [
	8, 7, 6, 6, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4,
	3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

MathUtils.zeros = function(val) {
	return MathUtils._ZEROS_LOOKUP_TAB[val & 0xff];
}

/**
 * M-Coder decoder
 *
 */

function MDecoder() {
	
}

MDecoder.prototype.readBin = function(context) {
	
}


/**
 * CABAC reader
 *
 */

function CABACReader(mdecoder) {
	
}

CABACReader.prototype.end_of_slice_segment_flag = function() {
	
}

CABACReader.prototype.end_of_sub_stream_one_bit = function() {
	
}

CABACReader.prototype.sao_merge_left_flag = function() {
	
}

CABACReader.prototype.sao_merge_up_flag = function() {
	
}

CABACReader.prototype.sao_type_idx_luma = function() {
	
}

CABACReader.prototype.sao_type_idx_chroma = function() {
	
}

CABACReader.prototype.sao_offset_abs = function() {
	
}

CABACReader.prototype.sao_offset_sign = function() {
	
}

CABACReader.prototype.sao_band_position = function() {
	
}

CABACReader.prototype.sao_eo_class_luma = function() {
	
}

CABACReader.prototype.sao_eo_class_chroma = function() {
	
}

CABACReader.prototype.split_cu_flag = function() {
	
}

CABACReader.prototype.cu_transquant_bypass_flag = function() {
	
}

CABACReader.prototype.cu_skip_flag = function() {
	
}

CABACReader.prototype.pred_mode_flag = function() {
	
}

CABACReader.prototype.part_mode = function() {
	
}

CABACReader.prototype.pcm_flag = function() {
	
}

CABACReader.prototype.prev_intra_luma_pred_flag = function() {
	
}

CABACReader.prototype.mpm_idx = function() {
	
}

CABACReader.prototype.rem_intra_luma_pred_mode = function() {
	
}

CABACReader.prototype.intra_chroma_pred_mode = function() {
	
}

CABACReader.prototype.rqt_root_cbf = function() {
	
}

CABACReader.prototype.merge_idx = function() {
	
}

CABACReader.prototype.merge_flag = function() {
	
}

CABACReader.prototype.merge_idx = function() {
	
}

CABACReader.prototype.inter_pred_idc = function() {
	
}

CABACReader.prototype.ref_idx_l0 = function() {
	
}

CABACReader.prototype.mvp_l0_flag = function() {
	
}

CABACReader.prototype.ref_idx_l1 = function() {
	
}

CABACReader.prototype.mvp_l1_flag = function() {
	
}

CABACReader.prototype.split_transform_flag = function() {
	
}

CABACReader.prototype.cbf_cb = function() {
	
}

CABACReader.prototype.cbf_cr = function() {
	
}

CABACReader.prototype.cbf_luma = function() {
	
}

CABACReader.prototype.abs_mvd_greater0_flag = function() {
	
}

CABACReader.prototype.abs_mvd_greater0_flag = function() {
	
}

CABACReader.prototype.abs_mvd_greater1_flag = function() {
	
}

CABACReader.prototype.abs_mvd_greater1_flag = function() {
	
}

CABACReader.prototype.abs_mvd_minus2 = function() {
	
}

CABACReader.prototype.mvd_sign_flag = function() {
	
}

CABACReader.prototype.abs_mvd_minus2 = function() {
	
}

CABACReader.prototype.mvd_sign_flag = function() {
	
}

CABACReader.prototype.cu_qp_delta_abs = function() {
	
}

CABACReader.prototype.cu_qp_delta_sign_flag = function() {
	
}

CABACReader.prototype.transform_skip_flag = function() {
	
}

CABACReader.prototype.last_sig_coeff_x_prefix = function() {
	
}

CABACReader.prototype.last_sig_coeff_y_prefix = function() {
	
}

CABACReader.prototype.last_sig_coeff_x_suffix = function() {
	
}

CABACReader.prototype.last_sig_coeff_y_suffix = function() {
	
}

CABACReader.prototype.coded_sub_block_flag = function() {
	
}

CABACReader.prototype.sig_coeff_flag = function() {
	
}

CABACReader.prototype.coeff_abs_level_greater1_flag = function() {
	
}

CABACReader.prototype.coeff_abs_level_greater2_flag = function() {
	
}

CABACReader.prototype.coeff_sign_flag = function() {
	
}

CABACReader.prototype.coeff_abs_level_remaining = function() {
	
}

//
// Constants
//

var YUV420 = {px: 2, py: 2},
    YUV422 = {px: 2, py: 1},
    YUV444 = {px: 1, py: 1};