import { IUser } from "@/store/userStore";
import { HttpRequestService } from ".";

const userservice = {
	async getProfile(): Promise<IUser> {
		const {
			data: { user },
		} = await HttpRequestService.fetchApi<{ user: IUser }>("/user/profile");
		return user;
	},
};

export default userservice;
