const Navbar = () => {
	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between items-center py-5 mx-auto c-space">
					<a href="/" className="">
						<img
							src={"assets/jac-logo.jpg"}
							alt="logo"
							className="w-[80px] h-[80px] object-contain"
						/>
					</a>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
