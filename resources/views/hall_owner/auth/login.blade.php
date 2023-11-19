@extends('hall_owner.auth.layout')

@section('content')
    <div class="card">
        <div class="card-body">

            <div class="app-brand justify-content-center mb-4 mt-2">
                <a href="index.html" class="app-brand-link gap-2">
                    <span class="app-brand-logo demo">
                        <svg width="32" height="22" viewBox="0 0 32 22" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
                                fill="#7367F0" />
                            <path opacity="0.06" fill-rule="evenodd" clip-rule="evenodd"
                                d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z" fill="#161616" />
                            <path opacity="0.06" fill-rule="evenodd" clip-rule="evenodd"
                                d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z" fill="#161616" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
                                fill="#7367F0" />
                        </svg>
                    </span>
                    <span class="app-brand-text demo text-body fw-bold ms-1">Vuexy</span>
                </a>
            </div>

            <h4 class="mb-1 pt-2">Welcome to {{ env('APP_NAME') }}! 👋</h4>
            <p class="mb-4">Please sign-in to your account and start the adventure</p>

            <form id="formAuthentication" class="mb-3" action="{{ route('hall_owner.auth.login.post') }}" method="POST">

                @csrf

                {{ view('hall_owner.layout.alerts') }}

                <div class="form-floating mb-3">
                    <input type="email" class="form-control @error('email') is-invalid @enderror" id="email"
                        name="email" aria-describedby="emailHelp" placeholder="abc@example.com" autofocus
                        value="{{ isset($hall_owner) ? $hall_owner->email : old('email') }}">
                    <label for="email">Email <span class="text-danger">*</span></label>
                    @error('email')
                        <div id="emailHelp" class="form-text invalid-feedback">{{ $message }}</div>
                    @else
                        <div id="emailHelp" class="form-text">Enter email.</div>
                    @enderror
                </div>

                <div class="form-floating mb-3">
                    <input type="password" class="form-control @error('password') is-invalid @enderror" id="password"
                        name="password" aria-describedby="passwordHelp"
                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                        value="{{ isset($hall_owner) ? $hall_owner->password : old('password') }}">
                    <label for="password">Password <span class="text-danger">*</span></label>
                    @error('password')
                        <div id="passwordHelp" class="form-text invalid-feedback">{{ $message }}</div>
                    @else
                        <div id="passwordHelp" class="form-text">Enter password.</div>
                    @enderror
                </div>
                {{-- <div class="d-flex justify-content-end">
                    <a href="auth-forgot-password-basic.html">
                        <small>Forgot Password?</small>
                    </a>
                </div> --}}
                <div class="mb-3">
                    <div class="form-check">
                        <input id="remember" name="remember" type="hidden" value="0" />
                        <input class="form-check-input" type="checkbox" id="remember-me" name="remember" value="1">
                        <label class="form-check-label" for="remember-me">
                            Remember Me
                        </label>
                    </div>
                </div>
                <div class="mb-3">
                    <button class="btn btn-primary d-grid w-100" type="submit">Sign in</button>
                </div>
                {{-- <div class="mb-3 d-flex justify-content-between gap-3">
                    <button class="btn btn-primary d-grid w-100" type="submit">Sign in</button>
                    <button class="btn btn-primary d-grid w-100" type="submit">Sign in</button>
                </div> --}}
            </form>
        </div>
    </div>
@endsection
