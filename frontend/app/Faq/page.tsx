import Navbar from './components/Navbar';
import AccordionMenu from './components/AccordionMenu';
import Footer from './components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function FaqPage() {
    return (
        <main className='min-h-screen'>
            <div className="bg-[url('/maastricht.png')] bg-cover bg-center h-[80vh] flex flex-col items-center justify-center">
                <div className="flex w-full justify-center">
                    {/*<Link href="/LogIn">
                        <button className=" max-w-[12vw] bg-transparent border border-[#FFF8F0] rounded-[50px] text-[#FFF8F0] py-[0.8vw] px-[3.5vw] cursor-pointer text-[1.2vmax] hover:bg-[#FFF8F0] hover:text-[#001C3D]">
                            Log In
                        </button>
                    </Link>*/}
                    <Navbar />
                </div>
                <div className='flex items-center text-center justify-center backdrop-blur-sm text-[8vmin] w-[80%] h-[65%] lg:max-w-none bg-white/10 p-8 rounded-lg xl:px-20 shadow-[12px_12px_30px_rgba(0,0,0,0.35)]'>Frequently Asked Questions</div>
            </div>

            <div className="max-w-3xl mx-auto p-6">
                <AccordionMenu title="Who is the coolest president?">
                    <p>- Anni, obviously!</p>
                </AccordionMenu>
                <AccordionMenu title="How can UCM students become engaged within UCSRN?">
                    <p>- There are various options to become engaged with UCSRN and its committees. Most commonly, students apply to become the academic or social external of our association to represent and follow their endeavors at UCSRN. After every one or two academic semesters, such a board position becomes available. If you are interested in applying, please send an email to our secretary via ucmsa-secretary@maastrichtuniversity.nl.</p>
                    <br />
                    <p>- If you are not willing to commit to one of the UCMSA Universalis boards as an external executive but still want to be involved, consider joining the UCSRN committee. Its main task is to facilitate the work of both social and academic externals of UCM by organizing, coordinating, or conducting administrational tasks. It is definitely a great option to connect to other students from different backgrounds for little work. If you are interested to join, please contact our social external via ucmsa-sb-external@maastrichtuniversity.nl.</p>
                </AccordionMenu>
                <AccordionMenu title="What are the main UCSRN events?">
                    <p>- Each year, the UCSRN association organizes internal tournaments in which all UC´s compete against each other. Despite the Covid-19 pandemic, the social chair was able to organize Spotlight. For those who don’t know. Spotlight is a music show for all talented singers among us. Furthermore, Sport tournaments, film screenings, and other activities take place regularly. Whether to join as fan, supporter, or competitor, it is definitely worth following our Newsletter and social meeting to receive news and information about these events.</p>
                </AccordionMenu>
                <AccordionMenu title="How are we connected to it?">
                    <p>- The Executive board of UCSRN is constructed to run the administrational- and organizational tasks of the association. Depending on different matters, the social- or academic committee chair or external affairs officer initiates regular meetings with all University Colleges executives (UC´s) to drive the mission of UCSRN and its members forward. If you want to get part of it, you can contact the external executives from our academic and social board. If you are interested in organizing social events to connect all UC´s, feel free to join our UCSRN committee, led by the social board executive. For more information, please check our social media frequently: Instagram: @ucmsa_universalis</p>
                </AccordionMenu>
                <AccordionMenu title="What is UCSRN?">
                    <p>- The UCSRN (University College Student Representatives of the Netherlands) association represents all of the study associations of the University Colleges in the Netherlands. Next to nine other University Colleges, the UCMSA Universalis is part of it. By taking an integral role in representing UCM students on a national level, UCSRN offers a great chance to meet, collaborate, and connect with other students with similar academic and social interests.</p>
                </AccordionMenu>
                <AccordionMenu title="Who do I go to when I want to book a room or reserve a room for something?">
                    <p>- The secretary handles all room bookings for committees and Universalis members! You can reach them at ucmsa-secretary@maastrichtuniversity.nl!</p>
                </AccordionMenu>
                <AccordionMenu title="What are the advantages of the EB?">
                    <p>- As a member of the Executive Board, you represent and manage our organization. You keep Universalis functioning and make the SB and AB more capable in their positions. You reside on the ‘Board of Universalis’, the only board officially present in the Statutes aside from the IB, and uphold policy. Being in charge of a study association with 600+ members, 12 board members, and 24k+ yearly budget, and meeting frequently with staff takes a lot of responsibility, and the experience it brings is challenging but valuable.</p>
                </AccordionMenu>
                <AccordionMenu title="What are the main roles of the EB?">
                    <p>- The Executive Board of Universalis not only manages the administration and finances of the organization, but is also the legal board of Universalis registered with the KvK. The Secretary handles scheduling, communications of the EB, the Treasurer handles the budget and finances, the Marketing is responsible for media representation, and the President administers and chairs meetings and assemblies.</p>
                </AccordionMenu>
                <AccordionMenu title="How can I join the EB?">
                    <p>- As for the other boards, applications for the EB open at least once a year. Applications definitely open towards the end of period 5 and if current members decide to only stay for one semester, applications also open towards the end of period 2. You will then find information about the application procedure on Tiktok, Instagram, and the newsletter. After you send in your CV and Letter of Motivation, you will be invited for an interview, or if you applied for President, you will have a debate with potential other candidates.</p>
                </AccordionMenu>
                <AccordionMenu title="How can I reach out and contact the EB if I have any questions or concerns?">
                    <p>- The easiest way to reach us is via e-mail: ucmsa-secretary@maastrichtuniversity.nl or ucmsa-president@maastrichtuniversity.nl. Alternatively, you can also look up the current members of the EB on the Universalis website and message them on Whatsapp or approach them at UCM!</p>
                </AccordionMenu>
                <AccordionMenu title="What are the advantages of joining the AB?">
                    <p>- There are many advantages of being a member of the AB. Most importantly, you are actively involved in ensuring and improving the standard of education at UCM! This includes reading the course evaluations that students fill in each period and discussing potential issues in meetings with staff. In these meetings, you also get to represent UCM students on various other issues. Additionally, you contribute to the community of UCM by being a member of the AB. For example, the AB organizes the semesterly mentor programme and enriches the academic experience of UCM students through lectures, fairs, and other events.</p>
                </AccordionMenu>
                <AccordionMenu title="How can I join the AB?">
                    <p>- As for the other boards, applications for the AB open at least once a year. Applications definitely open towards the end of period 5 and if current members decide to only stay for one semester, applications also open towards the end of period 2. You will then find information about the application procedure on Tiktok, Instagram, and the newsletter. After you send in your CV and Letter of Motivation, you will be invited for an interview, or if you applied for Chair, you will have a debate with potential other candidates.</p>
                </AccordionMenu>
                <AccordionMenu title="What kind of events does the AB organize?">
                    <p>- As the AB we organize events in accordance with UCM Staff. For instance, the biyearly Curriculum Fair, as well as the Masters Fair are organized by us. Further, we organize guest lectures, the mentor programme or events that incorporate alumni like the Life After the Bubble event. Recently, we have been trying to incorporate fun events that help prepare for the final examination of core courses through e.g. the Contemporary World History Treasure Hunt. We are always open for suggestions, especially events that can help facilitate a more diverse and inclusive environment at UCM.</p>
                </AccordionMenu>
                <AccordionMenu title="What does the AB discuss in the weekly meetings with UCM stuff?">
                    <p>- All four members of the AB are part of the Educational Programme Committee (EPC), alongside five staff members. The EPC meets once a month and discusses various topics. This includes the course evaluation reports, issues brought up by the student representatives or any other current concerns. Additionally, the AB Chair meets weekly with the President, the Social Board chair and Vice-Dean Mark Stout to ask for advice, UCM staff contacts that might be helpful in some situations, and permission for certain events. Also, the AB Chair attends the monthly Management Team (MT) meetings, alongside several staff members, such as the Dean and UCM professors. The MT is quite similar to the EPC, with the main difference that the topics discussed are less focused on education per se but more on organizational matters, such as graduation ceremonies, current research UCM is involved in, and UCM policies and regulations.</p>
                </AccordionMenu>
                <AccordionMenu title="What is the procedure to solve a student's problems? does it actually ever happen?">
                    <p>- If a student contacts us, we discuss their concerns in our weekly board meeting. We then give advice to the student and depending on the nature of the issue, we can also reach out to staff members in the name of the Academic Board. This way, students can stay anonymous if they wish. This usually happens a few times per period.</p>
                </AccordionMenu>
                <AccordionMenu title="How can I reach out to the AB if I have academic concerns?">
                    <p>- The easiest way to reach us is via e-mail: ucmsa-ab-advisor@maastrichtuniversity.nl. Alternatively, you can also look up the current members of the AB on the Universalis website and message them on Linkedin or approach them at UCM!</p>
                </AccordionMenu>
                <AccordionMenu title="How can I start a committee?">
                    <p>- If there is no committee yet that satisfies your interests, you can start your own one by finding two additional board members. Usually, a committee board consists of a chair, a secretary and a treasurer. Once you have found some peers, you should contact a social board executive to discuss specific details. Altogether, you must fill out a semester plan to finalize the foundation stage. Please send it to ucmsa-secretary@maastrichtuniversity.nl. Afterward, you are ready to go to plan and execute some cool committee events! </p>
                </AccordionMenu>
                <AccordionMenu title="Where will I get information about committee events?">
                    <p>- Mostly, committee related information is being posted on social media and our biweekly newsletter. While most of our committees have established their own Instagram accounts, it is advisable to follow them frequently. You can find their contact information on our Instagram (ucmsa_universalis). To track all the dates of committee events, the weekly calendar, posted on the UCM students Instagram page should be followed regularly.</p>
                </AccordionMenu>
                <AccordionMenu title="If I join a committee, am I obligated to join all of their events?">
                    <p>- No, being a committee member does not entail attending every event. There is no obligation to join as an active member. The answer for that is easy: our study association aims to bring people together, not to pressure for obligations</p>
                </AccordionMenu>
                <AccordionMenu title="How can my committee and I ask for money?">
                    <p>- Events and activities often incur expenses – and we budget for that! To request financial support, a committee must propose a semester plan with a presupposed allocation of finances. Importantly, it must be submitted and confirmed by the treasurer and secretary two weeks in advance of the GA. If you have any questions regarding semester plans or financial outlays, please contact our secretary under ucmsa-secretary@maastrichtuniversity.nl. </p>
                </AccordionMenu>
                <AccordionMenu title="How can I join the board of a committee?">
                    <p>- It is highly recommended to be engaged with the committee before joining its board. The answer for that is simply: the more you engage before, the more you know about their administrational and organizational procedures afterward. Both are great assets of the committee board. Now, if you are interested in joining a committee´s board, you must reach out to previous board members to ask for vacancies in order to apply for the following semester.</p>
                </AccordionMenu>
                <AccordionMenu title="How can I join committees?">
                    <p>- You can join a committee at any time and with relatively low efforts. You must be enrolled at UCM. If you are interested in a particular committee, why don‘t you shoot them a message via Instagram and Email to ask when and where to join? You can find their contact infos either on our website, or Instagram (ucmsa_universalis).</p>
                </AccordionMenu>
                <AccordionMenu title="What big yearly events happen in one academic year?">
                    <p>- Throughout the year, the social board organizes various events. One of the biggest events are the introduction days. Even though it may be tough to organize at times, it is amazing to say our pay-out, de facto, freshmen that are happy to have integrated into the UCM community. Furthermore, the social board organizes “Beginning of Period Drinks”, an event to offer students to reflect on previous periods, community events such as a yearly christmas event, pick-up events for merchandise, nationwide tournaments organized by UCSRN (Spotlight and sport tournaments), or “The Battle of the Studies”, an event to compete against other faculties. These are only a few examples. Join our social media Instagram: ucmsa_universalis to learn more about our events.</p>
                </AccordionMenu>
                <AccordionMenu title="What positions does the SB have?">
                    <p>- The social board consists of Social Events Executive, UC Relations Executive and Acquisitions Executive and a chair of the social board.</p>
                </AccordionMenu>
                <AccordionMenu title="What does the SB do?">
                    <p>- Being associated with the student life at UCM, the social board manages all social activities at UCM and beyond. This includes organizing introduction days, committee faires, community events, or representation of all committees. Most importantly though, all three executives are in charge of all committees by facilitating organization, representation, and lobbying in the backgrounds of UCM. While the Acquisitions Executive manages merchandise, promotional material and collaborations, the external exec is in close contact with UCSRN. The social internal´s role is to manage social media, introduction days, and advertisements. Finally, their chair facilitates social board meetings, is in close contact with the academic and executive board, represents, and communicates closely with UCM staff.</p>
                </AccordionMenu>
                <AccordionMenu title="How can I join the SB?">
                    <p>- As for the other boards, applications for the SB open at least once a year. Applications definitely open towards the end of period 5 and if current members decide to only stay for one semester, applications also open towards the end of period 2. You will then find information about the application procedure on Tiktok, Instagram, and the newsletter. After you send in your CV and Letter of Motivation, you will be invited for an interview, or if you applied for Chair, you will have a debate with potential other candidates.</p>
                </AccordionMenu>
                <AccordionMenu title="How can I submit an entry in the bi-weekly Universalis newsletter?">
                    <p>- If you would like to share anything with the UCM community, you are very welcome to submit an entry in our bi-weekly Universalis newsletter. Be aware though that your entry must be about UCM/ Universalis related topics. For inquiries, do not hesitate to shoot our secretary an e-mail via ucmsa-secretary@maastrichtuniversity.nl. </p>
                </AccordionMenu>
                <AccordionMenu title="How can I get engaged with the UCM community?">
                    <p>- If you are not engaged with the UCM community yet, there are plenty of options to do so. If you are interested in shaping UCM and its community, you may be a perfect fit for any of our board positions that become free every year. If you like to pursue any specific passion at UCM, you should look after our committees. Out of 25 from the field of sports, theater, charity, sustainability, party, music, or yoga, we are sure that there is at least one that is right for you. If there is not, why don´t you found one yourself? If you are interested, please contact ucmsa-sb-chair@maastrichtuniversity.nl. </p>
                </AccordionMenu>
                <AccordionMenu title="When/where/how can I order Universalis merch?">
                    <p>- Every semester, our beloved acquisitions executive organizes a fresh merch setup that is accessible to all UCM students, friends & family. Depending on the demand, merchandise can be bought once a semester usually. To order merch and other Universalis related products, you can find our Webshop here (quicklink: https://shop.ucmsa.nl/?post_type=product). Our webshop is easy-to-use and linked to our Universalis homepage. Importantly though, merch orders cannot be shipped to our customers. Instead, we offer pick-up events to distribute orders and emphasize community events. If you have any questions about any merch or product related issues, feel free to send an email to ucmsa-sb-acquisitions@maastrichtuniversity.nl.</p>
                </AccordionMenu>
                <AccordionMenu title="What payment methods do you provide?">
                    <p>- When ordering merch, we use a third-party payment provider, WooCommerce to process all orders. Specifically, Woocommerce offers to pay via Credit Card (Stripe), Bancontact, Sofort Überweisung, and iDeal. If you have further questions about merchandise, feel free to contact our acquisitions executive under ucmsa-sb-acquisitions@maastrichtuniversity.nl.</p>
                </AccordionMenu>
                <AccordionMenu title="What if I want to join the GA but I cannot make it?">
                    <p>- If you want to join the GA but are afraid to miss it, you can send another UCM instead that substitutes your voting rights. In doing so, please fill out a proxy form and send it to our secretary via ucmsa-secretary@maastrichtuniversity.nl before the GA. </p>
                </AccordionMenu>
                <AccordionMenu title="How long are GA&apos;s normally?">
                    <p>- To be honest it depends on whether it is focused on Budget, an Election, or both. GA&apos;s can be long, dry, and boring. Even though GA&apos;s may last up to 4 hours, it depends on your perception of how to make them enjoyable and entertaining. Make them fun. Invite some friends over and get some snacks to fasten your seatbelt for an unforgettable General Assembly!</p>
                </AccordionMenu>
                <AccordionMenu title="What is the GA and how does it work?">
                    <p>- The most integral body of our association is the general assembly (GA). Each year, there are three assemblies focusing on budgeting, elections, and surplus for the next academic year. The GA is chaired by the President of the UCMSA Universalis association and aims to foster debate and transparency about recent proceedings among the UCM student body. This includes to present recent updates from all three Universalis boards, committee related information, and to debate over the future mission of our association. By emphasizing a democratic conduct, it is fair to say that our GA, composed of the UCM community, is the underlying asset for a smooth running study association as ours. For detailed information about its procedure, please check our Policy Manual.</p>
                </AccordionMenu>
            </div>

            <Footer />
            
        </main>
    );
}
