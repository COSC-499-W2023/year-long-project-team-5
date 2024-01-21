import {
	Card,
	Image,
	View,
	Heading,
	Flex,
	Badge,
	Text,
	Button,
	useTheme,
  } from '@aws-amplify/ui-react';
  import { Divider } from '@aws-amplify/ui-react';
  import videoBG2 from '../assets/BG.mp4';
  import amplifyLogo from '../assets/amplify.svg';
  import cognitoLogo from '../assets/cognito.svg';
  import rekognitionLogo from '../assets/rekognition.svg';
  import appsync from '../assets/appsync.svg';
  import lambda from '../assets/lambda.svg';
  import s3 from '../assets/s3.svg';
  import Josh from '../assets/josh.jpg';
  import Abby from '../assets/abby.jpg';
  import Abhinav from '../assets/abhinav.jpg';
  import Beck from '../assets/beck.jpg';
  import Kael from '../assets/kael.jpg';
  import reactLogo from '../assets/reactLogo.svg';
  import {motion, useScroll} from "framer-motion";
  import { useRef } from "react";
  import { Outlet, useNavigate } from "react-router-dom";

  export const Home = () => {
	const { tokens } = useTheme();
	const ref = useRef(null);
	const { scrollXProgress } = useScroll({ container: ref });
	const navigate = useNavigate();
	return (
		<div>
			{/*video banner*/}
				<video src = {videoBG2} autoPlay loop muted width = "75%"/>
			{/*main three calls - with animation*/}
			<motion.div
				initial = {{opacity: 0}}
				whileInView = {{opacity:1}}
				exit = {{opacity: 0}}
				viewport={{amount: 0.5, once: false}}
			>
				<Flex alignItems = 'center' direction = 'row' justifyContent = 'center' wrap = "wrap" margin = '1rem 0rem 1rem 0rem'>
					<View padding={tokens.space.medium}>
						<Card width = '20rem' height = '12rem' border-top = '1px'>
							<Flex direction="column" alignItems="flex-start"  textAlign="left">
								<Divider/>
								<Heading level={5}>
									User-friendly
								</Heading>
								<Text as="span">
								The software doesn't require your clients to create an account or login, making it easy
								access for everyone regardless of their technology experience.
								</Text>
							</Flex>
						</Card>
					</View>
					<View
						padding={tokens.space.medium}
					>
						<Card width = '20rem' height = '12rem'>
							<Flex direction="column" alignItems="flex-start"  textAlign="left">
								<Divider/>
								<Heading level={5}>
									Asynchronous communication
								</Heading>
								<Text as="span">
									This software allows you to have asynchronous communication with your contacts, allowing
									for efficient and convenient communication.
								</Text>
							</Flex>
						</Card>
					</View>
					<View
						padding={tokens.space.medium}
						border-top = "1px solid #669999"
					>
						<Card width = '20rem' height = '12rem' border-top = "1px solid black">
							<Flex direction="column" alignItems="flex-start" textAlign="left">
								<Divider/>
								<Heading level={5}>
									Open Source
								</Heading>
								<Text as="span">
									This software is open source and developed using AWS services such as Amplify, Cognito, and Rekognition.
								</Text>
							</Flex>
						</Card>
					</View>
	  			</Flex>
			</motion.div>
			
			{/*service logo section*/}
			<div class = 'carousel'>
				<div class = "scroll" style = {{'--t': '40s'}}>
					<div>
						<figure className='figure'>
							<img src={amplifyLogo} alt = "AWS Amplify" width = '75em'/>
						</figure>
						<figure className='figure'>
							<img src={rekognitionLogo} alt = "Rekognition"  width = '75em'/>
						</figure>
						<figure className='figure'>
							<img src={cognitoLogo}  alt = "AWS Cognito" width = '75em'/>
						</figure>
						<figure className='figure'>
							<img src={appsync} alt = "AppSync"  width = '75em'/>
						</figure>
						<figure className='figure'>
							<img src={lambda} alt = "Lambda"  width = '75em'/>
						</figure>
						<figure className='figure'>
							<img src={s3} alt = "S3 Buckets" width = '75em'/>
						</figure>
						<figure className='figure'>
							<img src={reactLogo} alt = "React" width = '75em'/>
						</figure>
					</div>
					<div>
						<figure className='figure' >
							<img src={amplifyLogo} alt = "AWS Amplify" width = '75em'/>
						</figure>
						<figure className='figure'>
							<img src={rekognitionLogo} alt = "Rekognition" width = '75em'/>
						</figure>
						<figure className='figure'>
							<img src={cognitoLogo}  alt = "AWS Cognito" width = '75em'/>
						</figure>
						<figure className='figure'>
							<img src={appsync} alt = "AppSync"  width = '75em'/>
						</figure>
						<figure className='figure'>
							<img src={lambda} alt = "Lambda"  width = '75em'/>
						</figure>
						<figure className='figure'>
							<img src={s3} alt = "S3 Buckets" width = '75em'/>
						</figure>
						<figure className='figure'>
							<img src={reactLogo} alt = "React" width = '75em'/>
						</figure>
					</div>
				</div>
			</div>	
			
			{/*Team members*/}
			<Heading level = {3}>
					Meet the team!
				</Heading>
			<View padding = {tokens.space.large}>
				
				<Flex alignItems = 'center' direction = 'row' justifyContent = 'center' wrap = "nowrap">
					<div className='headerText'>
					<img className = "profile" src = {Abby} width = '100%'/>
					<motion.div
						initial = {{opacity: 0}}
						whileHover = {{
							opacity: 1,
							transition: {duration: 0.5}
						}}
					>
					<div className = 'center_text'>
					<h3>Abby Kiehlbauch</h3>
					<p>MAIN TASKS</p>
					</div>
					</motion.div>
					</div>
						
				<div className='headerText'>
				<img className = "profile" src = {Josh} width = '100%'/>
				<motion.div
					initial = {{opacity: 0}}
					whileHover = {{
						opacity: 1,
						transition: {duration: 0.5}
					}}
				>
				<div className = 'center_text'>
				<h3>Josh Medina Quiaro</h3>
				<p>MAIN TASKS</p>
				</div>
				</motion.div>
				</div>
				<div className='headerText'>
				<img className = "profile" src = {Abhinav} width = '100%'/>
				<motion.div
					initial = {{opacity: 0}}
					whileHover = {{
						opacity: 1,
						transition: {duration: 0.5}
					}}
				>
				<div className = 'center_text'>
				<h3>Abhinav Thota</h3>
				<p>MAIN TASK</p>
				</div>
				</motion.div>
				</div>
				<div className='headerText'>
				<img className = "profile" src = {Beck} width = '100%'/>
				<motion.div
					initial = {{opacity: 0}}
					whileHover = {{
						opacity: 1,
						transition: {duration: 0.5}
					}}
				>
				<div className = 'center_text'>
				<h3>Beck Corkle</h3>
				<p>MAIN TASK</p>
				</div>
				</motion.div>
				</div>
				<div className='headerText'>
				<img className = "profile" src = {Kael} width = '100%'/>
				<motion.div
					initial = {{opacity: 0}}
					whileHover = {{
						opacity: 1,
						transition: {duration: 0.5}
					}}
				>
				<div className = 'center_text'>
				<h3>Kael Pearson</h3>
				<p>MAIN TASKS</p>
				</div>
				</motion.div>
				</div>
						
			</Flex>
			</View>

			{/*software info*/}
			<View
			padding={tokens.space.large}
			border-top = "1px solid #669999"
			>
				<Card variation = 'elevated'>
					<Flex direction="column" alignItems="flex-start"  textAlign="left">
					<Heading level={5}>
						blur software
					</Heading>
					<Text as="span">
					The purpose of our software is to allow admins (such as doctors, managers, professors, etc.) to receive videos from users. From this we can enable asynchronized communication which allows for more efficient communication, enhancing the experience for both the user and admin. The intention of our software is to provide an easy to use, secure solution to asynchronous video sharing.
					</Text>
					<Button variation = 'primary' alignSelf = 'center' onClick={() => navigate('/Login')}>Try it out today!</Button>
					</Flex>
				</Card>
			</View>
		</div>
	);
  };