import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "../reducers/usersReducer";
const UserPage = () => {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users);
	useEffect(() => {
		dispatch(initializeUsers());
	}, [dispatch]);

	return (
		<div>
			<h3>Users</h3>

			<table>
				<thead>
					<tr>
						<th></th>
						<th>Blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>{user.name}</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserPage;
