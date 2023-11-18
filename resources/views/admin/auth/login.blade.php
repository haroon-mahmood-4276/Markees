@extends('admin.auth.layout')

@section('content')
    <div class="d-flex col-12 col-lg-5 align-items-center p-sm-5 p-4">
        <div class="w-px-400 mx-auto">
            <h3 class="mb-1 fw-bold">Welcome to {{ env('APP_NAME') }}! 👋</h3>
            <p class="mb-4">Please sign-in to your account and start the adventure</p>
            <form id="formAuthentication" class="mb-3" action="{{ route('admin.login') }}" method="POST">

                @csrf

                {{ view('admin.layout.alerts') }}

                <div class="form-floating mb-3">
                    <input type="email" class="form-control @error('email') is-invalid @enderror" id="email"
                        name="email" aria-describedby="emailHelp" placeholder="abc@example.com" autofocus
                        value="{{ isset($hall_owner) ? $hall_owner->email : old('email') }}">
                    <label for="email">Email <span class="text-danger">*</span></label>
                    @error('email')
                        <div id="emailHelp" class="form-text invalid-feedback">{{ $message }}</div>
                    @else
                        <div id="emailHelp" class="form-text">Enter email number of the owner.</div>
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
                        <div id="passwordHelp" class="form-text">Enter password number of the owner.</div>
                    @enderror
                </div>

                <div class="mb-3">
                    <div class="form-check">
                        <input id="remember" name="remember" type="hidden" value="0" />
                        <input class="form-check-input" type="checkbox" id="remember-me" name="remember" value="1">
                        <label class="form-check-label" for="remember-me">
                            Remember Me
                        </label>
                    </div>
                </div>

                <button class="btn btn-primary d-grid w-100">
                    Sign in
                </button>
            </form>
        </div>
    </div>
@endsection
