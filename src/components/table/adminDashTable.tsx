"use client";

export const AdminDashUserTable = ({ user, idx }: any) => {
	return (
		<tr
			key={user.id}
			className={`transition-colors ${
				idx % 2 === 0 ? "bg-white" : "bg-gray-50"
			} hover:bg-indigo-50`}
		>
			<td className="py-4 px-6">
				<div>
					<p className="font-semibold text-gray-900">{user.name}</p>
					<p className="text-xs text-gray-500">{user.email}</p>
				</div>
			</td>
			<td className="py-4 px-6">
				<p className="text-sm">{user.phone}</p>
			</td>
			<td className="py-4 px-6">
				<span
					className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize shadow-sm ${
						user.role === "AGENT"
							? "bg-blue-100 text-blue-800"
							: user.role === "LANDLORD"
							? "bg-emerald-100 text-emerald-800"
							: "bg-gray-100 text-gray-800"
					}`}
				>
					{user.role.toLowerCase()}
				</span>
			</td>
			<td className="py-4 px-6">
				<span
					className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize shadow-sm ${
						user.verificationStatus === "VERIFIED"
							? "bg-emerald-100 text-emerald-800"
							: user.verificationStatus === "PENDING"
							? "bg-amber-100 text-amber-800"
							: user.verificationStatus === "REJECTED"
							? "bg-rose-100 text-rose-800"
							: "bg-gray-100 text-gray-800"
					}`}
				>
					{user.verificationStatus.toLowerCase()}
				</span>
			</td>
			<td className="py-4 px-6">
				<div className="flex gap-4 text-xs text-gray-600">
					<span>📌 {user.propertiesCount}</span>
					<span>⭐ {user.favoritesCount}</span>
					<span>📝 {user.reviewsCount}</span>
				</div>
			</td>
			<td className="py-4 px-6 text-gray-500">
				{new Date(user.joinDate).toLocaleDateString()}
			</td>
		</tr>
	);
};
