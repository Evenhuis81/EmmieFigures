<template>
    <div id="topbar">
        <a href="/">
            <!-- <img id="logo" src="/assets/logo.png" /> -->
        </a>
        <div id="title">Emmie Figures</div>
        <div id="auth" />
    </div>
</template>

<style>
#topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 65px;
    border-bottom: 1px solid black;
    box-shadow: 5px 5px 5px lightgray;
    padding: 0px 40px;
}
#logo {
    height: 48px;
    padding: 0 7px;
    transition: 0.3s;
    transition-timing-function: linear;
}
#logo:hover {
    height: 62px;
    padding: 0;
}
#title {
    font-weight: 900;
    font-size: 2rem;
    color: #866;
}

@keyframes enlarge-logo {
    to {
        height: 48px;
        padding: 0 7px;
    }
}
</style>
