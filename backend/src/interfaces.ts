export interface Role {
	id?: string | undefined;
	name: string;
}

export interface User {
	id?: string | undefined;
	name: string;
	lastname: string;
	ci_number: string;
	email: string;
	phone_number?: string | undefined;
	role_id?: Role | undefined;
	status?: number | undefined;
	password?: string | undefined;
	home_dir?: string | undefined;
	restore_token?: string | undefined;
	created_at?: string | undefined;
	updated_at?: string | undefined;
	deleted_at?: string | undefined;
}

export interface Student {
	health_id?: string | undefined;
	academic_id?: string | undefined;
	id?: string | undefined;
	user_id: User;
	born_country?: string | undefined;
	born_state?: string | undefined;
	born_parroquia?: string | undefined;
	born_municipio?: string | undefined;
	born_place?: string | undefined;
	born_date?: string | undefined;
	status_check: number;
}

export interface Health_Info {
	id?: string | undefined;
	allergies?: string | undefined;
	lives_with: string;
	treatment?: string | undefined;
	fav_activity?: string | undefined;
	activity_site?: string | undefined;
	recreational_time?: string | undefined;
	sex: string;
	age?: number | undefined;
	weight?: number | undefined;
	size?: number | undefined;
	laterality?: string | undefined;
}

export interface Academic_Info {
	id?: string | undefined;
	level: number;
	section: string;
	stage: string;
	period?: string | undefined;
	inst_origin?: string | undefined;
	graduate?: boolean | undefined;
	inst_date?: string | undefined;
	user_res: string;
}

export interface Represent {
	id?: string | undefined;
	user_id: User;
	profession?: string | undefined;
	work_place?: string | undefined;
	work_phone_number?: string | undefined;
	home_phone_number?: string | undefined;
	income_month: number;
}
