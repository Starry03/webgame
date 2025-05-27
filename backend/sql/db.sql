--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8
-- Dumped by pg_dump version 16.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: classe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.classe (
    name character varying(32) NOT NULL,
    speed integer NOT NULL,
    attack integer NOT NULL,
    defence integer NOT NULL,
    mana integer NOT NULL,
    hp integer NOT NULL,
    description text,
    playable boolean NOT NULL
);


ALTER TABLE public.classe OWNER TO postgres;

--
-- Name: score; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.score (
    time_taken integer DEFAULT 0 NOT NULL,
    level integer DEFAULT 0 NOT NULL,
    health integer NOT NULL,
    used_enhancments integer DEFAULT 0 NOT NULL,
    defeated_enemies integer DEFAULT 0 NOT NULL,
    id integer NOT NULL,
    owner integer NOT NULL,
    mana integer NOT NULL
);


ALTER TABLE public.score OWNER TO postgres;

--
-- Name: score_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.score_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.score_id_seq OWNER TO postgres;

--
-- Name: score_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.score_id_seq OWNED BY public.score.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    id bigint NOT NULL,
    key text NOT NULL,
    expires_at timestamp without time zone DEFAULT (now() + '1 day'::interval) NOT NULL
);


ALTER TABLE public.session OWNER TO postgres;

--
-- Name: session_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.session ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(32) NOT NULL,
    password character varying(256) NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: score id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.score ALTER COLUMN id SET DEFAULT nextval('public.score_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: classe; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.classe (name, speed, attack, defence, mana, hp, description, playable) FROM stdin;
warrior	60	85	85	400	800	Un combattente potente con una forza d’attacco eccezionale e una buona resistenza. Anche se non eccelle nella velocità o nella magia, è un solido baluardo sul campo di battaglia	t
plant	0	40	5	300	150	Una pianta	f
archer_skeleton	20	65	10	450	200	Uno scheletro con un arco	f
spear_skeleton	40	45	20	450	250	Uno scheletro con una lancia	f
warrior_skeleton	40	50	25	450	300	Uno scheletro	f
werewolf	45	60	20	500	400	Un lupo	f
wizard	45	100	70	1200	750	Un maestro delle arti magiche con un’enorme riserva di mana e punti vita. Equilibrato in velocità e difesa, è ideale per infliggere danni magici a distanza	t
thief	80	75	65	500	750	Agile e rapido, questo ladro si muove con velocità impressionante. Sebbene abbia una difesa e un attacco più bassi, la sua mobilità lo rende perfetto per colpi rapidi e fughe strategiche	t
gorgone rossa	45	90	30	800	1000	Er boss	f
\.


--
-- Data for Name: score; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.score (time_taken, level, health, used_enhancments, defeated_enemies, id, owner, mana) FROM stdin;
13	101	0	0	2	1	31	400
17	201	0	0	3	2	33	351
17	201	0	0	3	3	33	351
17	201	0	0	3	4	33	351
17	201	0	0	3	5	33	351
17	201	0	0	3	6	33	351
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.session (id, key, expires_at) FROM stdin;
463	FjBA1rR+yUGp58Ahci7VZPlcRAAePQnGJN1wjDCw+Ic=	2025-05-27 16:00:17.967488
464	2ZSAJxkaxB7/0NelQ9G6vXuSPOBHvZy2kqrEP0Wgdn4=	2025-05-27 16:11:46.598087
465	nl0887zqplRNHCgaIifVrvhmQ9HoprNdeQqPswHSi6U=	2025-05-27 16:12:07.630675
466	aFwy75xAGdjhuHrL/Ux447f0K1j3NmHmw3kJ+e0KVHg=	2025-05-27 16:49:13.766001
467	YRBcAMvRGZuL8In2r8afmnhXOqnk/Q0mZQgaRzwF9wU=	2025-05-27 18:51:54.75669
468	le7wBrE7YtRCMmg+xF/gK8NSm2mX9O+vNTVg00TInYE=	2025-05-27 18:52:13.664521
469	PTddi//ry+URsTNS4DP009jt5O6Msl/AwwGPNgwhQZ4=	2025-05-27 18:52:44.330227
470	wfdwG7io8ydij0PmwAscWDLwuQXNvoaMpUaiJFO/cHQ=	2025-05-27 18:53:00.586016
471	I1WUOW97RI9fPtIWt62kCM3agcUqdn9AwNRlbB3ZUm4=	2025-05-27 18:53:18.533269
472	YgMaqWDS5WXYfJ8isbTYNi92SqVCAE0ZuZ3tENm5WzM=	2025-05-27 18:53:43.631658
473	pQ88nImKhVM/bYlbkPtCOc2/tSQSSuqTwb1nnKOQNSM=	2025-05-27 18:54:18.717457
474	4M8y559cw5s9uf4Eka6x5U5LPCMy8JfiNd/nQJiIej0=	2025-05-27 18:56:24.075603
475	3OhGFStYt6PkGZEpCKxRCVLLz7muLrWR2brEdSP++D4=	2025-05-27 18:56:35.281872
476	Fkkuyr1tIJqQw8TgeYz47JSQOqExuXVfVdAUWDJ5RS4=	2025-05-27 18:56:50.518148
477	TKfo8WDzmkhQNlMGaLRf+eDTVCUkVKhQmZ6d84RUdiA=	2025-05-27 18:57:01.826707
478	W/RW0izfoz1pptYQITBL1cG+ONqchQnLJSGMGWjVADc=	2025-05-27 18:57:16.817464
479	B9JyCLkvE3kVTiiubI3rZ925FMLQRzs7KbwJU65kNNU=	2025-05-28 12:31:43.848795
480	IyevuBjtClX/uGsbAnNiHY3OpLWnIGK3xHjStwmXwDQ=	2025-05-28 12:37:38.033038
481	UhhjY6H/7fa0lxbSda07E34h9BLOSM2OyeUIKna/+pQ=	2025-05-28 12:49:08.223905
482	ygLmm/ugGBVsWDJl36s8fVwTVXAW94Lw1gXdqpmuJJw=	2025-05-28 12:49:40.983865
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, username, password) FROM stdin;
31	starry2	1b8b7d51173804baa165f018b7e401476e6f05d2e1fdb08e9cf605aa1f85cd84
33	starry	1b8b7d51173804baa165f018b7e401476e6f05d2e1fdb08e9cf605aa1f85cd84
\.


--
-- Name: score_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.score_id_seq', 6, true);


--
-- Name: session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.session_id_seq', 482, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 33, true);


--
-- Name: classe classe_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classe
    ADD CONSTRAINT classe_name_key UNIQUE (name);


--
-- Name: classe classe_undefined_name_fkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classe
    ADD CONSTRAINT classe_undefined_name_fkey PRIMARY KEY (name);


--
-- Name: score score_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.score
    ADD CONSTRAINT score_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user user_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- Name: score score_owner_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.score
    ADD CONSTRAINT score_owner_fkey FOREIGN KEY (owner) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

