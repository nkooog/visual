package bcs.vl.util.es.jsonObject;

public class GetDocObject {
	String _index;
	String _type;
	String _id;
	String _version;
	int _seq_no;
	int _primary_term;
	boolean found;
	Source _source;

	public String get_index() {
		return _index;
	}

	public void set_index(String _index) {
		this._index = _index;
	}

	public String get_type() {
		return _type;
	}

	public void set_type(String _type) {
		this._type = _type;
	}

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public String get_version() {
		return _version;
	}

	public void set_version(String _version) {
		this._version = _version;
	}

	public int get_seq_no() {
		return _seq_no;
	}

	public void set_seq_no(int _seq_no) {
		this._seq_no = _seq_no;
	}

	public int get_primary_term() {
		return _primary_term;
	}

	public void set_primary_term(int _primary_term) {
		this._primary_term = _primary_term;
	}

	public boolean isFound() {
		return found;
	}

	public void setFound(boolean found) {
		this.found = found;
	}

	public Source get_source() {
		return _source;
	}

	public void set_source(Source _source) {
		this._source = _source;
	}
}
