package bcs.vl.util.es.jsonObject;


public class ResultObject {
	int took;
	boolean timed_out;
	Shards _shards;
	Hit hits;

	public int getTook() {
		return took;
	}

	public void setTook(int took) {
		this.took = took;
	}

	public boolean isTimed_out() {
		return timed_out;
	}

	public void setTimed_out(boolean timed_out) {
		this.timed_out = timed_out;
	}

	public Shards get_shards() {
		return _shards;
	}

	public void set_shards(Shards _shards) {
		this._shards = _shards;
	}

	public Hit getHits() {
		return hits;
	}

	public void setHits(Hit hits) {
		this.hits = hits;
	}
}























