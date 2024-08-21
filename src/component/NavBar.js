import React from 'react';
import QrItem from './QrItem';

function NavBar() {
    return (
        <div>
            {/* Nav START */}
            <nav className="navbar navbar-expand-xl">
                <div className="container">
                    {/* Logo START */}
                    <a className="navbar-brand" href="">
                        <img
                            className="light-mode-item navbar-brand-item"
                            src="assets/images/logo.png"
                            alt="logo"
                        />
                        <img
                            className="dark-mode-item navbar-brand-item"
                            src="assets/images/logo.png"
                            alt="logo"
                        />
                    </a>
                    {/* Logo END */}
                    {/* Main navbar START */}
                    <div
                        className="navbar-collapse collapse"
                        id="navbarCollapse"
                    >
                        <ul className="navbar-nav navbar-nav-scroll dropdown-hover mx-auto">
                            {/* Nav item */}
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle active"
                                    href="#"
                                    data-bs-auto-close="outside"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    메인 홈
                                </a>
                                <div className="dropdown-menu dropdown-menu-size-lg p-3">
                                    <div className="row pt-2">
                                        {/* Image and button */}
                                        <div className="col-sm-6">
                                            <ul className="list-unstyled">
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="index.html"
                                                    >
                                                        Classic Default
                                                    </a>{' '}
                                                </li>
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="index-creative-agency.html"
                                                    >
                                                        Creative Agency
                                                    </a>{' '}
                                                </li>
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="index-digital-agency.html"
                                                    >
                                                        Digital Agency
                                                        <span className="badge text-bg-success ms-2">
                                                            New
                                                        </span>
                                                    </a>{' '}
                                                </li>
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="index-design-agency.html"
                                                    >
                                                        Design Agency
                                                        <span className="badge text-bg-success ms-2">
                                                            New
                                                        </span>
                                                    </a>{' '}
                                                </li>
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="index-seo-agency.html"
                                                    >
                                                        SEO Agency
                                                        <span className="badge text-bg-success ms-2">
                                                            New
                                                        </span>
                                                    </a>{' '}
                                                </li>
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="index-landing-product.html"
                                                    >
                                                        Product Landing
                                                    </a>{' '}
                                                </li>
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item active"
                                                        href="index-mobile-app-showcase.html"
                                                    >
                                                        Mobile App Showcase
                                                    </a>{' '}
                                                </li>
                                            </ul>
                                        </div>
                                        {/* Index nav links */}
                                        <div className="col-sm-6">
                                            <ul className="list-unstyled">
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="index-saas.html"
                                                    >
                                                        SaaS v.1
                                                    </a>{' '}
                                                </li>
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="index-saas-v2.html"
                                                    >
                                                        SaaS v.2
                                                    </a>{' '}
                                                </li>
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="index-saas-v3.html"
                                                    >
                                                        SaaS v.3
                                                    </a>{' '}
                                                </li>
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="index-saas-v4.html"
                                                    >
                                                        SaaS v.4
                                                    </a>{' '}
                                                </li>
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="index-saas-v5.html"
                                                    >
                                                        SaaS v.5
                                                    </a>{' '}
                                                </li>
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="index-finance-consulting.html"
                                                    >
                                                        Finance consulting
                                                        <span className="badge text-bg-success ms-2">
                                                            New
                                                        </span>
                                                    </a>{' '}
                                                </li>
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="index-shop.html"
                                                    >
                                                        Index Shop
                                                    </a>{' '}
                                                </li>
                                            </ul>
                                        </div>
                                        {/* CTA */}
                                        <div className="col-12">
                                            <hr className="mt-2" />{' '}
                                            {/* Divider */}
                                            <div className="d-sm-flex justify-content-between align-items-center px-2">
                                                <div className="me-3 mb-2 mb-sm-0">
                                                    <h6 className="mb-2 mb-sm-0">
                                                        Ready to get started?
                                                    </h6>
                                                    <small className="mb-0">
                                                        Take your documents to
                                                        the next level with
                                                        Mizzle
                                                    </small>
                                                </div>
                                                <a
                                                    href="#"
                                                    className="btn btn-sm btn-primary"
                                                >
                                                    Get in touch
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            {/* Nav item */}
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    결제내역
                                </a>
                                <ul className="dropdown-menu">
                                    {/* Dropdown submenu */}
                                    <li className="dropdown dropend">
                                        <a
                                            className="nav-link dropdown-link dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            href="#"
                                        >
                                            About
                                        </a>
                                        <ul
                                            className="dropdown-menu"
                                            data-bs-popper="none"
                                        >
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="about-v1.html"
                                                >
                                                    About v.1
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="about-v2.html"
                                                >
                                                    About v.2
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="about-v3.html"
                                                >
                                                    About v.3
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="team.html"
                                                >
                                                    Team
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="services-v1.html"
                                                >
                                                    Services v.1
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="services-v2.html"
                                                >
                                                    Services v.2
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="service-single.html"
                                                >
                                                    Service Single
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="customer-stories.html"
                                                >
                                                    Customer Stories
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="customer-story-single.html"
                                                >
                                                    Customer Story Single
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="career.html"
                                                >
                                                    Career{' '}
                                                    <span className="badge text-bg-primary ms-2">
                                                        2 Job
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="career-single.html"
                                                >
                                                    Career Single
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        {' '}
                                        <a
                                            className="dropdown-item"
                                            href="contact-v1.html"
                                        >
                                            Contact v.1
                                        </a>
                                    </li>
                                    <li>
                                        {' '}
                                        <a
                                            className="dropdown-item"
                                            href="contact-v2.html"
                                        >
                                            Contact v.2
                                        </a>
                                    </li>
                                    {/* Dropdown submenu */}
                                    <li className="dropdown dropend">
                                        <a
                                            className="dropdown-item dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            href="#"
                                        >
                                            SaaS Pages
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="features.html"
                                                >
                                                    Features
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="feature-single.html"
                                                >
                                                    Feature Single
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="integrations.html"
                                                >
                                                    Integrations
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="integration-single.html"
                                                >
                                                    Integration Single
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    {/* Dropdown submenu */}
                                    <li className="dropdown dropend">
                                        <a
                                            className="dropdown-item dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            href="#"
                                        >
                                            Shop
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="shop-grid.html"
                                                >
                                                    Shop Grid
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="shop-single.html"
                                                >
                                                    Shop Single
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="shop-cart.html"
                                                >
                                                    Shop Cart
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="shop-empty-cart.html"
                                                >
                                                    Shop Empty Cart
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="shop-checkout.html"
                                                >
                                                    Shop Checkout
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    {/* Dropdown submenu */}
                                    <li className="dropdown dropend">
                                        <a
                                            className="dropdown-item dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            href="#"
                                        >
                                            Blog
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="blog-grid.html"
                                                >
                                                    Blog Grid
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="blog-list-sidebar.html"
                                                >
                                                    Blog List Sidebar
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="blog-single-v1.html"
                                                >
                                                    Blog Single v.1
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="blog-single-v2.html"
                                                >
                                                    Blog Single v.2
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    {/* Dropdown submenu */}
                                    <li className="dropdown dropend">
                                        <a
                                            className="nav-link dropdown-link dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            href="#"
                                        >
                                            Specialty Pages
                                        </a>
                                        <ul
                                            className="dropdown-menu"
                                            data-bs-popper="none"
                                        >
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="help-center.html"
                                                >
                                                    Help Center
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="help-center-detail.html"
                                                >
                                                    Help Center Detail
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="pricing.html"
                                                >
                                                    Pricing
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="faq.html"
                                                >
                                                    Faqs
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="error-404.html"
                                                >
                                                    Error 404
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="coming-soon.html"
                                                >
                                                    Coming Soon
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="terms-and-condition.html"
                                                >
                                                    Terms &amp; Conditions
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    {/* Dropdown submenu */}
                                    <li className="dropdown dropend">
                                        <a
                                            className="dropdown-item dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            href="#"
                                        >
                                            Authentication
                                        </a>
                                        <ul
                                            className="dropdown-menu"
                                            data-bs-popper="none"
                                        >
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="sign-up.html"
                                                >
                                                    Sign Up
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="sign-in.html"
                                                >
                                                    Sign In
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="forgot-password.html"
                                                >
                                                    Forgot Password
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    {/* Dropdown submenu */}
                                    <li className="dropdown dropend">
                                        <a
                                            className="dropdown-item dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            href="#"
                                        >
                                            Accounts
                                        </a>
                                        <ul
                                            className="dropdown-menu"
                                            data-bs-popper="none"
                                        >
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="account-detail.html"
                                                >
                                                    Details
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="account-security.html"
                                                >
                                                    Security
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="account-notification.html"
                                                >
                                                    Notifications
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="account-projects.html"
                                                >
                                                    My Projects
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="account-payment-details.html"
                                                >
                                                    Payment Details
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="account-order.html"
                                                >
                                                    Order History
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="account-wishlist.html"
                                                >
                                                    Wishlist
                                                </a>
                                            </li>
                                            <li>
                                                {' '}
                                                <a
                                                    className="dropdown-item"
                                                    href="account-delete.html"
                                                >
                                                    Delete Profile
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            {/* Nav item */}
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    이달의 카드 순위
                                </a>
                                <div className="dropdown-menu dropdown-menu-center dropdown-menu-size-xl p-3">
                                    <div className="row g-xl-3">
                                        {/* Work */}
                                        <div className="col-xl-8 d-none d-xl-block">
                                            <div className="d-flex gap-4">
                                                {/* Card */}
                                                <div className="card bg-transparent">
                                                    {/* Image */}
                                                    <img
                                                        src="assets/images/portfolio/list/01.jpg"
                                                        className="card-img"
                                                        alt
                                                    />
                                                    {/* Card body */}
                                                    <div className="card-body px-0 text-start pb-0">
                                                        <h6>
                                                            <a href="#">
                                                                Ceremony Worthy
                                                                of Time
                                                            </a>
                                                        </h6>
                                                        <p className="mb-2 small">
                                                            We help our
                                                            customers better
                                                            manage their web
                                                            presence.
                                                        </p>
                                                        <a
                                                            className="icon-link icon-link-hover stretched-link mb-0"
                                                            href="portfolio-case-studies-v1.html"
                                                        >
                                                            Learn more
                                                            <i className="bi bi-arrow-right" />{' '}
                                                        </a>
                                                    </div>
                                                </div>
                                                {/* Card */}
                                                <div className="card bg-transparent">
                                                    {/* Image */}
                                                    <img
                                                        src="assets/images/portfolio/list/02.jpg"
                                                        className="card-img"
                                                        alt
                                                    />
                                                    {/* Card body */}
                                                    <div className="card-body px-0 text-start pb-0">
                                                        <h6>
                                                            <a href="#">
                                                                Brushstrokes and
                                                                Beyond
                                                            </a>
                                                        </h6>
                                                        <p className="mb-2 small">
                                                            We help our
                                                            customers better
                                                            manage their web
                                                            presence.
                                                        </p>
                                                        <a
                                                            className="icon-link icon-link-hover stretched-link mb-0"
                                                            href="portfolio-case-studies-v2.html"
                                                        >
                                                            Learn more
                                                            <i className="bi bi-arrow-right" />{' '}
                                                        </a>
                                                    </div>
                                                </div>
                                                {/* Divider line */}
                                                <div className="vr ms-2" />
                                            </div>
                                        </div>
                                        {/* Index nav links */}
                                        <div className="col-xl-4">
                                            <ul className="list-unstyled">
                                                <li className="dropdown-header h6">
                                                    Portfolio Pages
                                                </li>
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="portfolio-masonry.html"
                                                    >
                                                        Portfolio Masonry
                                                    </a>{' '}
                                                </li>
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="portfolio-showcase.html"
                                                    >
                                                        Portfolio Showcase
                                                    </a>{' '}
                                                </li>
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="portfolio-list.html"
                                                    >
                                                        Portfolio List
                                                    </a>{' '}
                                                </li>
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="portfolio-case-studies-v1.html"
                                                    >
                                                        Portfolio Case Study v.1
                                                    </a>{' '}
                                                </li>
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="portfolio-case-studies-v2.html"
                                                    >
                                                        Portfolio Case Study v.2
                                                    </a>{' '}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    마이페이지
                                </a>
                                <div className="dropdown-menu dropdown-menu-center dropdown-menu-size-xl p-3">
                                    <div className="row g-xl-3">
                                        {/* Work */}
                                        <div className="col-xl-8 d-none d-xl-block">
                                            <div className="d-flex gap-4">
                                                {/* Card */}
                                                <div className="card bg-transparent">
                                                    {/* Image */}
                                                    <img
                                                        src="assets/images/portfolio/list/01.jpg"
                                                        className="card-img"
                                                        alt
                                                    />
                                                    {/* Card body */}
                                                    <div className="card-body px-0 text-start pb-0">
                                                        <h6>
                                                            <a href="#">
                                                                Ceremony Worthy
                                                                of Time
                                                            </a>
                                                        </h6>
                                                        <p className="mb-2 small">
                                                            We help our
                                                            customers better
                                                            manage their web
                                                            presence.
                                                        </p>
                                                        <a
                                                            className="icon-link icon-link-hover stretched-link mb-0"
                                                            href="portfolio-case-studies-v1.html"
                                                        >
                                                            Learn more
                                                            <i className="bi bi-arrow-right" />{' '}
                                                        </a>
                                                    </div>
                                                </div>
                                                {/* Card */}
                                                <div className="card bg-transparent">
                                                    {/* Image */}
                                                    <img
                                                        src="assets/images/portfolio/list/02.jpg"
                                                        className="card-img"
                                                        alt
                                                    />
                                                    {/* Card body */}
                                                    <div className="card-body px-0 text-start pb-0">
                                                        <h6>
                                                            <a href="#">
                                                                Brushstrokes and
                                                                Beyond
                                                            </a>
                                                        </h6>
                                                        <p className="mb-2 small">
                                                            We help our
                                                            customers better
                                                            manage their web
                                                            presence.
                                                        </p>
                                                        <a
                                                            className="icon-link icon-link-hover stretched-link mb-0"
                                                            href="portfolio-case-studies-v2.html"
                                                        >
                                                            Learn more
                                                            <i className="bi bi-arrow-right" />{' '}
                                                        </a>
                                                    </div>
                                                </div>
                                                {/* Divider line */}
                                                <div className="vr ms-2" />
                                            </div>
                                        </div>
                                        {/* Index nav links */}
                                        <div className="col-xl-4">
                                            <ul className="list-unstyled">
                                                <li className="dropdown-header h6">
                                                    Portfolio Pages
                                                </li>
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="portfolio-masonry.html"
                                                    >
                                                        Portfolio Masonry
                                                    </a>{' '}
                                                </li>
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="portfolio-showcase.html"
                                                    >
                                                        Portfolio Showcase
                                                    </a>{' '}
                                                </li>
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="portfolio-list.html"
                                                    >
                                                        Portfolio List
                                                    </a>{' '}
                                                </li>
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="portfolio-case-studies-v1.html"
                                                    >
                                                        Portfolio Case Study v.1
                                                    </a>{' '}
                                                </li>
                                                <li>
                                                    {' '}
                                                    <a
                                                        className="dropdown-item"
                                                        href="portfolio-case-studies-v2.html"
                                                    >
                                                        Portfolio Case Study v.2
                                                    </a>{' '}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* Main navbar END */}
                    {/* Buttons */}
                    <ul className="nav align-items-center dropdown-hover ms-2">
                        
                        {/* Get application button */}
                        <li className="nav-item ms-2">
                            <QrItem />
                        </li>
                        {/* Responsive navbar toggler */}
                        <li className="nav-item">
                            <button
                                className="navbar-toggler ms-sm-3 p-2"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarCollapse"
                                aria-controls="navbarCollapse"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-animation">
                                    <span />
                                    <span />
                                    <span />
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* Nav END */}
        </div>
    );
}

export default NavBar;
