import { SupabaseClient, createClient } from '@supabase/supabase-js';

import { config } from "dotenv";
config();

class Supabase {
	supabase: SupabaseClient<any, "public", any>;

	constructor() {
		const url: string = process.env.SUPABASE_URL || "";
		const key: string = process.env.SUPABASE_KEY || "";

		this.supabase = createClient(url, key);
	};

	async validateToken(token: string): Promise<boolean> {
		const { data, error } = await this.supabase.from('api').select('token,is_available').eq('token', token);

		if (error) console.error(error);
		
		if (data && data[0])
			return data[0].is_available;
		else
			return false;
	};
};

export default Supabase;