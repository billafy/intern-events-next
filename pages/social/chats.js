import _ from "../../styles/social/Chats.module.scss";

const Chats = () => {
	return (
		<div className={_.container}>
			<div className={_.chatList}>
				<input
					type="search"
					className={_.search}
					placeholder="Search or Start A New Chat"
				/>
				<ul>
					<li>
						<div className={_.user}>
							Prof.Nalla Irke
							<div className={_.listMsg}>
								Kya be, padhai likhai karle exams aa gye.
							</div>
						</div>
					</li>

					<li>
						<div className={_.user}>
							Nukhil Dabbawala
							<div className={_.listMsg}>
								Mera dabba lele par assignment bhejde.
							</div>
						</div>
					</li>
					<li>
						<div className={_.user}>
							Patrick Lele
							<div className={_.listMsg}>
								Mere Guest lecture rakhwa do, 1000-2000 jyada
								lelo
							</div>
						</div>
					</li>
				</ul>
			</div>

			<div className={_.chatPrivate}>
				<div className={_.yourProfile}>Billa</div>
				<div className={_.body}>
					<div className={_.userMsg}>
						Hi, Mai Billa bawla ho gaya hoon
					</div>
					<div className={_.yourMsg}>Mujhe pehle se hi pata tha</div>
				</div>
				<div className={_.footer}>
					<form>
						<input type="text" id="message" />
						<button>SEND</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Chats;
