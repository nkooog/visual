package bcs.vl.util.es.jsonObject;

import java.util.ArrayList;


public class Hit {
	Total total;
	double max_score;
	ArrayList<Hit> hits;
	String _index;
	String _type;
	String _id;
	double _score;
	Source _source;


	public Total getTotal() {
		return total;
	}

	public void setTotal(Total total) {
		this.total = total;
	}

	public double getMax_score() {
		return max_score;
	}

	public void setMax_score(double max_score) {
		this.max_score = max_score;
	}

	public ArrayList<Hit> getHits() {
		return hits;
	}

	public void setHits(ArrayList<Hit> hits) {
		this.hits = hits;
	}

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

	public double get_score() {
		return _score;
	}

	public void set_score(double _score) {
		this._score = _score;
	}

	public Source get_source() {
		return _source;
	}

	public void set_source(Source _source) {
		this._source = _source;
	}
}
