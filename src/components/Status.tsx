import { calculateADA } from "@/utils/calculateADA";

type Props = {
	pool_information: PoolInformation;
};

const Status = ({ pool_information }: Props) => {
	const bgColor = "bg-gradient-to-r from-rose-100 to-teal-100";
	return (
		<div className={`max-w-4xl m-auto pt-4`}>
			<div className="container my-24 px-6 mx-auto">
				{/* <!-- Section: Design Block --> */}
				<section className="mb-32 text-gray-800 text-center">
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-0 items-center">
						{/* Block */}
						<div className="mb-12 lg:mb-0 relative">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-16 h-16 text-gray-400 mx-auto mb-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
								/>
							</svg>
							<h5 className="text-lg font-medium text-blue-600 mb-4">
								{pool_information.block_count ? pool_information.block_count : "0 Blocks"}
							</h5>
							<p className="font-medium text-gray-500">Lifetime Blocks</p>
							<hr className="absolute right-0 top-0 w-px bg-gray-200 h-full hidden lg:block" />
						</div>
						{/* Delegators */}
						<div className="mb-12 lg:mb-0 relative">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-16 h-16 text-gray-400 mx-auto mb-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
								/>
							</svg>
							<h5 className="text-lg text-blue-600 font-bold mb-4">
								{pool_information.live_delegators}
							</h5>
							<h6 className="font-medium text-gray-500">Delegators</h6>
							<hr className="absolute right-0 top-0 w-px bg-gray-200 h-full hidden lg:block" />
						</div>
						{/* Fixed Cost */}
						<div className="mb-12 md:mb-0 relative">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-16 h-16 text-gray-400 mx-auto mb-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
								/>
							</svg>
							<h5 className="text-lg font-medium text-blue-600 mb-4">
								{calculateADA(pool_information.fixed_cost, 0)} ADA + {pool_information.margin} %
							</h5>
							<h6 className="font-medium text-gray-500">Cost</h6>
							<hr className="absolute right-0 top-0 w-px bg-gray-200 h-full hidden lg:block" />
						</div>

						<div className="mb-12 md:mb-0 relative">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-16 h-16 text-gray-400 mx-auto mb-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
								/>
							</svg>
							<h5 className="text-lg text-blue-600 mb-4">
								{calculateADA(pool_information.active_stake as string, 2, true)}
							</h5>
							<h6 className="font-medium text-gray-500 mb-0">Active Stake</h6>
						</div>
					</div>

					<div className="mx-auto flex max-w-screen-sm items-center justify-center my-12">
						<div className="w-full rounded-md bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-1">
							<div className=" h-full w-full bg-white p-4 text-start md:text-center">
								<p className="">Ticker : {pool_information.meta_json.ticker}</p>
								<p className="pt-2 break-words">
									Pool ID : {pool_information.pool_id_bech32}
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Status;
