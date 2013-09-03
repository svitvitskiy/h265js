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

PPS.read = function(bitReader) {
	
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

function BitReader() {
	
}

BitReader.prototype.check16 = function() {
	
}

BitReader.prototype.skip = function(n) {
	
}

/**
 * ExpGOLOMB reader
 *
 */

var GolombReader {};

GolombReader.readU = function() {
	
}

GolombReader.readS = function() {
	
}

GolombReader.readT = function() {
	
}

/**
 * M-Coder decoder
 *
 */

function MDecoder() {
	
}

MDecoder.prototype.readBin(int context) {
	
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